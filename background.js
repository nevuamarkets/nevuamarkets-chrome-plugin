  // === background.js ===

// Global websocket manager instance
let polyManager = null;
let subscribedAssets = new Set();

/**
 * Sends a message to a tab, handling disconnected tabs gracefully
 * @param {number} tabId - The ID of the tab to send the message to
 * @param {Object} message - The message to send
 * @returns {Promise<void>}
 */
async function sendTabMessage(tabId, message) {
  try {
    await chrome.tabs.sendMessage(tabId, message);
  } catch (err) {
    // Ignore errors from inactive/reloading tabs
    const errorMessage = err.message?.toLowerCase() || '';
    if (!errorMessage.includes("receiving end does not exist") &&
        !errorMessage.includes("could not establish connection")) {
      console.error('Nevua: Error sending message to tab:', err);
    }
  }
}

/**
 * Broadcasts a message to all Polymarket tabs except the sender
 * @param {number|null} senderTabId - The ID of the tab that sent the original message (to exclude), or null to broadcast to all
 * @param {Object} message - The message to broadcast
 */
async function broadcastToTabs(senderTabId, message) {
  const tabs = await chrome.tabs.query({ url: "https://polymarket.com/*" });
  await Promise.all(tabs.map(tab => {
    if (senderTabId === null || tab.id !== senderTabId) {
      return sendTabMessage(tab.id, message);
    }
  }));
}

/**
 * Lazily loads the Nevua Polymarket websocket manager (browser build via CDN)
 * and attaches the price-update handler.
 * The library is dynamically imported to avoid bundling requirements.
 */
async function getPolyManager() {
  if (polyManager) return polyManager;
  try {
    const mod = await import('@nevuamarkets/poly-websockets');
    polyManager = new mod.WSSubscriptionManager({
      onPolymarketPriceUpdate: handlePriceUpdates,
      onWSOpen: (groupId, assetIds) => {
        return Promise.resolve();
      },
      onWSClose: (groupId, code, reason) => {
        return Promise.resolve();
      },
      onError: (error) => {
        //console.error('Nevua: error:', error);
        return Promise.resolve();
      }
    });
    return polyManager;
  } catch (err) {
    console.error('Nevua: Failed to initialise websocket manager:', err);
    return null;
  }
}

/**
 * Ensures websocket subscriptions match the set of currently ACTIVE alerts.
 * Adds subscriptions for newly required clobTokenIds and removes those
 * no longer referenced by any active alert.
 */
async function ensureSubscriptions(needed) {
  needed = new Set(needed);

  // Determine differences
  const toAdd = [...needed].filter(id => !subscribedAssets.has(id));
  const toRemove = [...subscribedAssets].filter(id => !needed.has(id));

  if (toAdd.length === 0 && toRemove.length === 0) return;

  const mgr = await getPolyManager();
  if (!mgr) return;

  try {
    if (toAdd.length) {
      await mgr.addSubscriptions(toAdd);
      toAdd.forEach(id => subscribedAssets.add(id));
    }
    if (toRemove.length) {
      await mgr.removeSubscriptions(toRemove);
      toRemove.forEach(id => subscribedAssets.delete(id));
    }
  } catch (err) {
    console.error('Nevua: Subscription update failed:', err);
  }
}

/**
 * Callback for live price updates coming from websocket manager.
 * Processes alerts and broadcasts price updates to all content scripts.
 * @param {import('@nevuamarkets/poly-websockets').PolymarketPriceUpdateEvent[]} events
 */
async function handlePriceUpdates(events) {
  // Process alerts in background (works even with no pages open)
  await processAlertsForPriceUpdates(events);
  
  // Broadcast price updates to all content scripts for UI updates
  const tabs = await chrome.tabs.query({ url: "https://polymarket.com/*" });
  await Promise.all(tabs.map(tab => 
    sendTabMessage(tab.id, {
      type: "price_updates", 
      events: events
    })
  ));
}

/**
 * Processes alerts for price updates, triggering notifications when conditions are met.
 * This runs in the background and doesn't require any Polymarket pages to be open.
 * @param {import('@nevuamarkets/poly-websockets').PolymarketPriceUpdateEvent[]} events
 */
async function processAlertsForPriceUpdates(events) {
  try {
    // Load current alerts from storage
    const result = await chrome.storage.local.get(['polymarket_alerts']);
    const alerts = result.polymarket_alerts || [];
    
    const now = Date.now();
    const THIRTY_MIN = 30 * 60 * 1000;
    let alertsChanged = false;

    for (const ev of events) {
      const price = parseFloat(ev.price) * 100;
      const assetId = ev.asset_id; // This is the clobTokenId

      for (const alert of alerts) {
        if (alert.status !== 'Active') continue;
        if (alert.clobtokenId !== assetId) continue;

        const meetsCondition =
          (alert.priceAlert === 'Over' && price >= alert.targetPrice) ||
          (alert.priceAlert === 'Under' && price <= alert.targetPrice);

        if (!meetsCondition) continue;

        const canNotify =
          alert.trigger === 'One Time' ||
          (alert.trigger === 'Recurring every 30 minutes' &&
            now - alert.lastTriggeredAtMS >= THIRTY_MIN);

        if (!canNotify) continue;

        // Fire chrome notification
        const notificationId = "polymarket-alert-" + Date.now();
        try {
          await chrome.notifications.create(notificationId, {
            type: "basic",
            iconUrl: chrome.runtime.getURL("icon128.png"),
            title: "📈 Polymarket Price Alert",
            message: `'${alert.marketQuestion}' price is now ${price.toFixed(2)}¢ [${alert.outcomeName}]`,
            silent: false,
          });
        } catch (err) {
          console.error('Nevua: Failed to create notification:', err);
        }

        alert.lastTriggeredAtMS = now;
        alert.triggerCount += 1;

        if (alert.trigger === 'One Time') {
          alert.status = 'Paused';
        }
        
        alertsChanged = true;
      }
    }

    // Save alerts if any were modified
    if (alertsChanged) {
      await chrome.storage.local.set({ 'polymarket_alerts': alerts });
      
      // Update subscriptions in case some alerts paused themselves (exclude closed markets)
      const needed = alerts
        .filter(alert => alert.status === 'Active' && !alert.closed)
        .map(alert => alert.clobtokenId);
      await ensureSubscriptions(needed);
      
      // Update badge (exclude closed markets)
      const activeCount = alerts.filter(alert => alert.status === 'Active' && !alert.closed).length;
      updateBadge(activeCount);
      
      // Broadcast alert update to all tabs for UI refresh
      await broadcastToTabs(null, {
        type: "alert_update",
        alerts: alerts
      });
    }
  } catch (err) {
    console.error('Nevua: Failed to process alerts for price updates:', err);
  }
}

/**
 * Loads alerts from storage and updates badge
 */
function loadAndUpdateBadge() {
  chrome.storage.local.get(['polymarket_alerts'], (result) => {
    if (chrome.runtime.lastError) {
      console.error('Nevua: Error loading alerts for badge:', chrome.runtime.lastError);
      return;
    }
    
    const savedAlerts = result.polymarket_alerts || [];
    const activeCount = savedAlerts.filter(alert => alert.status === 'Active' && !alert.closed).length;
    updateBadge(activeCount);
  });
}

/**
 * Initializes alert subscriptions from stored alerts
 */
async function initializeAlerts() {
  try {
    const result = await chrome.storage.local.get(['polymarket_alerts']);
    const savedAlerts = result.polymarket_alerts || [];
    
    // Get active alerts that need subscriptions (exclude closed markets)
    const needed = savedAlerts
      .filter(alert => alert.status === 'Active' && !alert.closed)
      .map(alert => alert.clobtokenId);
    
    if (needed.length > 0) {
      console.log(`Nevua: Initializing ${needed.length} alert subscriptions`);
      await ensureSubscriptions(needed);
    }
  } catch (err) {
    console.error('Nevua: Failed to initialize alerts:', err);
  }
}

/**
 * Initializes the extension and clears any existing notifications from previous sessions
 */
chrome.runtime.onInstalled.addListener(() => {
  // Clear any existing notifications from previous sessions
  chrome.notifications.getAll((notifications) => {
    Object.keys(notifications).forEach(id => {
      if (id.startsWith('polymarket-alert-')) {
        chrome.notifications.clear(id);
      }
    });
  });
  
  // Initialize badge and alerts
  loadAndUpdateBadge();
  initializeAlerts();
  
  // Start market closure checker
  startMarketClosureChecker();
});

/**
 * Initialize badge and alerts when service worker starts up
 */
chrome.runtime.onStartup.addListener(() => {
  loadAndUpdateBadge();
  initializeAlerts();
  
  // Start market closure checker
  startMarketClosureChecker();
});

/**
 * Listen for storage changes to update badge and subscriptions
 */
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local' && changes.polymarket_alerts) {
    const newAlerts = changes.polymarket_alerts.newValue || [];
    const activeCount = newAlerts.filter(alert => alert.status === 'Active' && !alert.closed).length;
    updateBadge(activeCount);
    
    // Update subscriptions when alerts change from external sources (exclude closed markets)
    const needed = newAlerts
      .filter(alert => alert.status === 'Active' && !alert.closed)
      .map(alert => alert.clobtokenId);
    ensureSubscriptions(needed);
  }
});

// Initialize alerts when service worker starts (handles restarts)
initializeAlerts();

// Start market closure checker when service worker starts
startMarketClosureChecker();

// === In background.js (add this listener to support notifications) ===

/**
 * Rate limiter for API requests
 */
class RateLimiter {
  constructor(requestsPerSecond) {
    this.requestsPerSecond = requestsPerSecond;
    this.interval = 1000 / requestsPerSecond; // ms between requests
    this.lastRequestTime = 0;
  }

  async throttle() {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    if (timeSinceLastRequest < this.interval) {
      const delay = this.interval - timeSinceLastRequest;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    this.lastRequestTime = Date.now();
  }
}

const marketChecker = new RateLimiter(2); // 2 requests per second

/**
 * Checks a single market for closure status
 * @param {string} conditionId - The condition ID to check
 * @returns {Promise<Object|null>} - Market data or null if error/not found
 */
async function checkMarketClosure(conditionId) {
  try {
    await marketChecker.throttle();
    
    // TESTING: Return fake closed market data for any conditionId
    // console.log(`Nevua: TESTING - Returning fake closed market data for ${conditionId}`);
    // return {
    //   conditionId: conditionId,
    //   closed: true,
    //   tokens: [
    //     {
    //       outcome: "Yes",
    //       price: 0.75,
    //       winner: true
    //     },
    //     {
    //       outcome: "No", 
    //       price: 0.25,
    //       winner: false
    //     }
    //   ]
    // };
    
    /* ORIGINAL CODE - commented out for testing */
    const response = await fetch(`https://clob.polymarket.com/markets/${conditionId}`);
    if (!response.ok) {
      console.error(`Nevua: Failed to fetch market ${conditionId}: ${response.status}`);
      return null;
    }
    
    const data = await response.json();
    if (!data) {
      console.error(`Nevua: No data returned for market ${conditionId}`);
      return null;
    }
    
    return {
      conditionId: data.condition_id,
      closed: data.closed,
      tokens: data.tokens
    };
    
  } catch (error) {
    console.error(`Nevua: Error checking market ${conditionId}:`, error);
    return null;
  }
}

/**
 * Processes closed markets and updates alerts accordingly
 */
async function processClosedMarkets() {
  try {
    console.log('Nevua: Checking for closed markets...');
    
    // Load current alerts from storage
    const result = await chrome.storage.local.get(['polymarket_alerts']);
    const alerts = result.polymarket_alerts || [];
    
    // Find alerts for markets that aren't closed yet
    const openAlerts = alerts.filter(alert => !alert.closed && alert.conditionId);
    
    if (openAlerts.length === 0) {
      console.log('Nevua: No open market alerts to check');
      return;
    }
    
    console.log(`Nevua: Checking ${openAlerts.length} open markets for closure`);
    
    let alertsChanged = false;
    const alertsToRemove = [];
    
    // Check each market sequentially with rate limiting
    for (const alert of openAlerts) {
      const marketData = await checkMarketClosure(alert.conditionId);
      
      if (!marketData) {
        // If we can't fetch market data, skip this alert
        continue;
      }
      
      if (marketData.closed) {
        try {
          const tokens = marketData.tokens;
          
          if (!tokens || !Array.isArray(tokens) || tokens.length === 0) {
            // Invalid or missing tokens, mark for removal
            console.log(`Nevua: Removing alert for market ${alert.conditionId} due to invalid token data`);
            alertsToRemove.push(alert.id);
            continue;
          }
          
          // Find the winning outcome - first check for explicit winner flag
          let winningToken = tokens.find(token => token.winner === true);
          
          // If no explicit winner, find the token with highest price
          if (!winningToken) {
            winningToken = tokens.reduce((highest, current) => 
              current.price > highest.price ? current : highest
            );
          }
          
          // Update the alert
          alert.closed = true;
          alert.outcome = winningToken.outcome;
          alert.status = 'Paused'; // Pause closed alerts
          alertsChanged = true;
          
          // Send notification about market closure
          const notificationId = "polymarket-closure-" + Date.now();
          try {
            await chrome.notifications.create(notificationId, {
              type: "basic",
              iconUrl: chrome.runtime.getURL("icon128.png"),
              title: "🔔 Market Closed",
              message: `'${alert.marketQuestion}' has been closed. Outcome: ${alert.outcome}`,
              silent: false,
            });
          } catch (err) {
            console.error('Nevua: Failed to create market closure notification:', err);
          }
          
          console.log(`Nevua: Market ${alert.conditionId} closed with outcome: ${alert.outcome}`);
        } catch (error) {
          console.error(`Nevua: Error parsing tokens for market ${alert.conditionId}:`, error);
          // Mark for removal if we can't parse the data
          alertsToRemove.push(alert.id);
        }
      }
    }
    
    // Remove alerts that couldn't be processed
    if (alertsToRemove.length > 0) {
      for (const alertId of alertsToRemove) {
        const index = alerts.findIndex(a => a.id === alertId);
        if (index !== -1) {
          alerts.splice(index, 1);
          alertsChanged = true;
        }
      }
    }
    
    // Save alerts if any were modified
    if (alertsChanged) {
      await chrome.storage.local.set({ 'polymarket_alerts': alerts });
      
      // Update subscriptions (closed markets don't need subscriptions)
      const needed = alerts
        .filter(alert => alert.status === 'Active' && !alert.closed)
        .map(alert => alert.clobtokenId);
      await ensureSubscriptions(needed);
      
      // Update badge
      const activeCount = alerts.filter(alert => alert.status === 'Active' && !alert.closed).length;
      updateBadge(activeCount);
      
      // Broadcast alert update to all tabs for UI refresh
      await broadcastToTabs(null, {
        type: "alert_update",
        alerts: alerts
      });
      
      console.log(`Nevua: Updated ${alertsChanged ? 'some' : 'no'} alerts for market closures`);
    }
  } catch (err) {
    console.error('Nevua: Failed to process closed markets:', err);
  }
}

/**
 * Starts the market closure checker that runs every 10 minutes
 */
function startMarketClosureChecker() {
  // Check immediately on start
  processClosedMarkets();
  
  // Then check every 5 minutes
  setInterval(processClosedMarkets, 10 * 60 * 1000);
  
  console.log('Nevua: Market closure checker started (runs every 10 minutes)');
}

/**
 * Handles notification click events - clears the notification when clicked
 * @param {string} notificationId - The ID of the clicked notification
 */
chrome.notifications.onClicked.addListener((notificationId) => {
  chrome.notifications.clear(notificationId);
});

/**
 * Handles notification close events
 * @param {string} notificationId - The ID of the closed notification
 * @param {boolean} byUser - Whether the notification was closed by user action
 */
chrome.notifications.onClosed.addListener((notificationId, byUser) => {
  // Notification closed
});

/**
 * Updates the extension badge with the number of active alerts
 * @param {number} count - Number of active alerts
 */
function updateBadge(count) {
  if (count > 0) {
    chrome.action.setBadgeText({ text: count.toString() });
    chrome.action.setBadgeBackgroundColor({ color: '#3b82f6' });
    chrome.action.setBadgeTextColor({ color: '#ffffff' });
  } else {
    chrome.action.setBadgeText({ text: '' });
  }
}

/**
 * Handles messages from content scripts and popup
 */
chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  // Legacy notification handling - no longer needed as alerts are processed in background
  if (req.type === "notify") {
    sendResponse({ ok: true });
    return false;
  }
  
  // Handle subscription updates from content scripts
  if (req.type === "update_subscriptions") {
    ensureSubscriptions(req.needed);
    sendResponse({ ok: true });
    return false;
  }

  // Handle alert updates from content scripts and popup
  if (req.type === "alert_updated") {
    // Update badge based on new alerts (exclude closed markets)
    const activeCount = req.alerts.filter(alert => alert.status === 'Active' && !alert.closed).length;
    updateBadge(activeCount);
    
    // Update subscriptions based on new alert state (exclude closed markets)
    const needed = req.alerts
      .filter(alert => alert.status === 'Active' && !alert.closed)
      .map(alert => alert.clobtokenId);
    ensureSubscriptions(needed);
    
    // Broadcast alert update to all other tabs (exclude sender if it's a tab)
    if (sender.tab) {
      broadcastToTabs(sender.tab.id, {
        type: "alert_update",
        alerts: req.alerts
      });
    } else {
      // Message from popup, broadcast to all tabs
      broadcastToTabs(null, {
        type: "alert_update",
        alerts: req.alerts
      });
    }
    sendResponse({ ok: true });
    return false;
  }

  // Handle badge update requests
  if (req.type === "update_badge") {
    updateBadge(req.count);
    sendResponse({ ok: true });
    return false;
  }
});
  