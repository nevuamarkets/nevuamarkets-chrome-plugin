/**
 * Waits for the trade widget container to appear and injects the alert box.
 * Uses simple polling instead of complex observers to avoid multiple triggers.
 */
async function waitForTradeBox() {
  // If we've already injected the alert box, don't do anything
  if (alertBoxInjected || document.getElementById("pm-alert-box")) {
    return;
  }

  const container = document.querySelector("#trade-widget");
  if (container) {
    // Get the slug and fetch market data
    const slug = getSlugFromUrl();
    if (slug) {
      const marketData = await fetchMarketDataWithCache(slug);
      injectAlertBox(container, marketData);
      alertBoxInjected = true;
      return;
    }

    // For other pages, inject immediately even without a slug (no markets)
    injectAlertBox(container, null);
    alertBoxInjected = true;
    return;
  }

  // If not found, try again after a short delay (simple polling)
  setTimeout(() => {
    if (!alertBoxInjected && !document.getElementById("pm-alert-box")) {
      waitForTradeBox();
    }
  }, 500);
}

// Initialize the alert widget when the page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    alertBoxInjected = false; // Reset state on page load
    waitForTradeBox();
    startPolling();
  });
} else {
  alertBoxInjected = false; // Reset state
  waitForTradeBox();
  startPolling();
}

// Simple polling to check for new content instead of complex observers
let pollingInterval = null;

function startPolling() {
  // Clear any existing polling
  if (pollingInterval) {
    clearInterval(pollingInterval);
  }
  
  pollingInterval = setInterval(() => {
    if (!alertBoxInjected && !document.getElementById("pm-alert-box")) {
      waitForTradeBox();
    }
  }, 1000); // Check every second
}

// Reset injection state when navigating
window.addEventListener('popstate', () => {
  alertBoxInjected = false;
  startPolling();
});

// Reset injection state when URL changes (simplified)
let lastUrl = location.href;
let lastSlug = getSlugFromUrl();

setInterval(() => {
  const currentUrl = location.href;
  const currentSlug = getSlugFromUrl();
  
  if (currentUrl !== lastUrl) {
    lastUrl = currentUrl;
    alertBoxInjected = false;
    // Remove existing alert box so it can be re-injected with new data
    const existingBox = document.getElementById("pm-alert-box");
    if (existingBox) existingBox.remove();
    
    // Only clear cache if slug actually changed (not just URL params)
    if (currentSlug !== lastSlug && lastSlug) {
      //console.log(`Nevua: Slug changed (accordion) from ${lastSlug} to ${currentSlug}, refreshing widget`);
      ensureCacheInitialized();
      marketDataCache.delete(lastSlug);
    }
    lastSlug = currentSlug;
    
    startPolling();
  } else if (currentSlug !== lastSlug) {
    // Slug changed without a URL change (e.g., on /sports page)
    //console.log(`Nevua: Slug changed (accordion) from ${lastSlug} to ${currentSlug}, refreshing widget`);
    alertBoxInjected = false;
    // Remove existing alert box so it can be re-injected with new data
    const existingBox2 = document.getElementById("pm-alert-box");
    if (existingBox2) existingBox2.remove();
    if (lastSlug) {
      ensureCacheInitialized();
      marketDataCache.delete(lastSlug);
    }
    lastSlug = currentSlug;
    startPolling();
  }
}, 1000);

// Refresh alerts when page becomes visible to ensure real-time updates
document.addEventListener('visibilitychange', () => {
  if (!document.hidden && renderAlertsListCallback) {
    // Small delay to ensure everything is ready
    setTimeout(() => {
      renderAlertsListCallback();
    }, 100);
  }
});

// Global state for managing alerts - prevent re-initialization if already set
if (typeof window.nevuaActiveAlerts === 'undefined') {
  window.nevuaActiveAlerts = [];
}
if (typeof window.nevuaRenderAlertsListCallback === 'undefined') {
  window.nevuaRenderAlertsListCallback = null;
}

let activeAlerts = window.nevuaActiveAlerts;
let renderAlertsListCallback = window.nevuaRenderAlertsListCallback;

// Rate limiting and caching for API requests - prevent re-initialization if already set
if (typeof window.nevuaMarketDataCache === 'undefined') {
  window.nevuaMarketDataCache = new Map();
}
if (typeof window.nevuaLastFetchTime === 'undefined') {
  window.nevuaLastFetchTime = new Map();
}
if (typeof window.nevuaPendingRequests === 'undefined') {
  window.nevuaPendingRequests = new Map();
}

let marketDataCache = window.nevuaMarketDataCache;
let lastFetchTime = window.nevuaLastFetchTime;
let pendingRequests = window.nevuaPendingRequests; // Track pending requests to prevent duplicates
const RATE_LIMIT_MS = 5000; // 5 seconds minimum between requests for same slug
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes cache TTL

/**
 * Ensures the cache Maps are properly initialized
 * This prevents undefined errors during script re-injection or timing issues
 */
function ensureCacheInitialized() {
  if (!window.nevuaMarketDataCache || !(window.nevuaMarketDataCache instanceof Map)) {
    window.nevuaMarketDataCache = new Map();
    marketDataCache = window.nevuaMarketDataCache;
  }
  if (!window.nevuaLastFetchTime || !(window.nevuaLastFetchTime instanceof Map)) {
    window.nevuaLastFetchTime = new Map();
    lastFetchTime = window.nevuaLastFetchTime;
  }
  if (!window.nevuaPendingRequests || !(window.nevuaPendingRequests instanceof Map)) {
    window.nevuaPendingRequests = new Map();
    pendingRequests = window.nevuaPendingRequests;
  }
}

/**
 * Ensures websocket subscriptions match the set of currently ACTIVE and OPEN alerts
 */
async function ensureSubscriptions() {
  const needed = activeAlerts
    .filter(alert => alert.status === 'Active' && !alert.closed)
    .map(alert => alert.clobtokenId);
    
  chrome.runtime.sendMessage({
    type: "update_subscriptions",
    needed: needed
  }, (response) => {
    if (chrome.runtime.lastError) {
      console.error('Nevua: Failed to update subscriptions:', chrome.runtime.lastError);
    }
  });
}

/**
 * Saves alerts to Chrome storage and notifies other tabs
 */
function saveAlertsToStorage() {
  chrome.storage.local.set({ 'polymarket_alerts': activeAlerts }, () => {
    if (chrome.runtime.lastError) {
      console.error('Nevua: Error saving alerts:', chrome.runtime.lastError);
      return;
    }

    // Notify background script to broadcast update to other tabs and update badge
    chrome.runtime.sendMessage({
      type: "alert_updated",
      alerts: activeAlerts
    }, (response) => {
      if (chrome.runtime.lastError) {
        console.error('Nevua: Failed to broadcast alert update:', chrome.runtime.lastError);
      }
    });
  });
}

/**
 * Loads alerts from Chrome storage
 */
function loadAlertsFromStorage() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['polymarket_alerts'], (result) => {
      if (chrome.runtime.lastError) {
        console.error('Nevua: Error loading alerts:', chrome.runtime.lastError);
        resolve([]);
        return;
      }
      
      const savedAlerts = result.polymarket_alerts || [];
      
      // Normalize status format for existing alerts
      savedAlerts.forEach(alert => {
        // Normalize status format (handle both old and new status format)
        if (alert.status === 'active') {
          alert.status = 'Active';
        } else if (alert.status === 'paused') {
          alert.status = 'Paused';
        }
      });
      
      resolve(savedAlerts);
    });
  });
}

/**
 * Saves alert widget expand state to Chrome storage
 */
function saveExpandStateToStorage(isExpanded) {
  chrome.storage.local.set({ 'polymarket_widget_expanded': isExpanded }, () => {
    if (chrome.runtime.lastError) {
      console.error('Nevua: Error saving widget expand state:', chrome.runtime.lastError);
    }
  });
}

/**
 * Loads alert widget expand state from Chrome storage
 */
function loadExpandStateFromStorage() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['polymarket_widget_expanded'], (result) => {
      if (chrome.runtime.lastError) {
        console.error('Nevua: Error loading widget expand state:', chrome.runtime.lastError);
        resolve(true); // Default to expanded
        return;
      }
      
      // Default to expanded if not set
      const isExpanded = result.polymarket_widget_expanded !== false;
      resolve(isExpanded);
    });
  });
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Handle price updates from background script
  if (message.type === "price_updates") {
    handlePriceUpdates(message.events);
    return false;
  }

  // Handle alert updates from other tabs
  if (message.type === "alert_update") {
    activeAlerts = message.alerts;
    window.nevuaActiveAlerts = activeAlerts;
    if (renderAlertsListCallback) renderAlertsListCallback();
    ensureSubscriptions();
    return false;
  }
});

/**
 * Callback for live price updates coming from background script.
 * Now that alert processing is handled in the background, this just refreshes the UI.
 * @param {import('@nevuamarkets/poly-websockets').PolymarketPriceUpdateEvent[]} events
 */
async function handlePriceUpdates(events) {
  // Alert processing is now handled in background script
  // This just refreshes the UI if the alerts list is visible
  if (renderAlertsListCallback) {
    // Small delay to allow background script to update storage first
    setTimeout(() => {
      loadAlertsFromStorage().then(alerts => {
        activeAlerts = alerts;
        window.nevuaActiveAlerts = activeAlerts;
        renderAlertsListCallback();
      });
    }, 100);
  }
}

/**
 * Extracts the slug from the current URL
 * @returns {string|null} - The slug from the URL or null if not found
 */
function getSlugFromUrl() {
  // Handle classic /event/<slug> pages first
  const eventMatch = window.location.pathname.match(/^\/event\/([^/]+)$/);
  if (eventMatch) {
    return eventMatch[1];
  }

  // Handle /sports pages which embed the slug in accordion item IDs
  if (window.location.pathname.startsWith('/sports')) {
    // Collect all accordion items containing a sports market
    const accordionItems = Array.from(document.querySelectorAll('div[id^="sports-accordion-item-"]'));
    if (accordionItems.length === 0) {
      //console.log('Nevua: No accordion items found');
      return null; // Nothing yet – probably still loading
    }

    let target = null;
    if (accordionItems.length === 1) {
      // Single match – use it regardless of state
      //console.log('Nevua: Single accordion item found');
      target = accordionItems[0];
    } else {
      // Multiple matches – prefer the one that is currently open
      //console.log('Nevua: Multiple accordion items found');
      target = accordionItems.find(el => el.getAttribute('data-state') === 'open') || accordionItems[0];
      if (target && target.getAttribute('data-state') !== 'open') {
        //console.log('Nevua: No open accordion items found, defaulting to first item');
      }
    }

    const id = target.id || '';
    const prefix = 'sports-accordion-item-';
    if (id.startsWith(prefix)) {
      let slugValue = id.slice(prefix.length);
      if (slugValue.endsWith('-moneyline')) {
        slugValue = slugValue.replace(/-moneyline$/, '');
      }
      return slugValue;
    }
  }

  return null;
}

/**
 * Cached wrapper for fetchMarketData with rate limiting and deduplication
 * @param {string} slug - The event slug to fetch data for
 * @returns {Promise<Object|null>} - The processed market data or null if failed
 */
async function fetchMarketDataWithCache(slug) {
  // Ensure cache Maps are properly initialized
  ensureCacheInitialized();
  
  const now = Date.now();
  const cacheKey = slug;
  
  // Check if we have cached data that's still valid
  const cachedData = marketDataCache.get(cacheKey);
  if (cachedData && (now - cachedData.timestamp) < CACHE_TTL_MS) {
    //console.log(`Nevua: Using cached market data for slug: ${slug}`);
    return cachedData.data;
  }
  
  // Check if there's already a pending request for this slug
  const pendingRequest = pendingRequests.get(cacheKey);
  if (pendingRequest) {
    //`Nevua: Waiting for pending request for slug: ${slug}`);
    return await pendingRequest;
  }
  
  // Check rate limiting
  const lastFetch = lastFetchTime.get(cacheKey) || 0;
  if ((now - lastFetch) < RATE_LIMIT_MS) {
    //console.log(`Nevua: Rate limited, using cached data for slug: ${slug}`);
    return cachedData ? cachedData.data : null;
  }
  
  // Create and track the fetch promise
  //console.log(`Nevua: Fetching fresh market data for slug: ${slug}`);
  const fetchPromise = fetchMarketData(slug).then(data => {
    // Update cache and rate limit tracking
    lastFetchTime.set(cacheKey, now);
    if (data) {
      marketDataCache.set(cacheKey, { data, timestamp: now });
    }
    
    // Remove from pending requests
    pendingRequests.delete(cacheKey);
    
    return data;
  }).catch(error => {
    // Remove from pending requests on error too
    pendingRequests.delete(cacheKey);
    throw error;
  });
  
  // Store the promise to prevent duplicate requests
  pendingRequests.set(cacheKey, fetchPromise);
  
  return await fetchPromise;
}

/**
 * Fetches market data for a given event slug from the gamma API
 * @param {string} slug - The event slug to fetch data for
 * @returns {Promise<Object|null>} - The processed market data or null if failed
 */
async function fetchMarketData(slug) {
  try {
    const response = await fetch(`https://gamma-api.polymarket.com/events?slug=${slug}`, {
      headers: {
        'User-Agent': 'Nevua-Markets-Chrome-Extension/1.0'
      }
    });
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    
    const data = await response.json();
    if (!data || !Array.isArray(data) || data.length === 0) {
      console.error('Nevua: Invalid API response format');
      return null;
    }

    const event = data[0];
    const result = {
      eventTitle: event.title,
      slug: event.slug,
      markets: []
    };

    // Process each market in the response
    if (event.markets && Array.isArray(event.markets)) {
      event.markets.forEach(mkt => {
        if (mkt.active === true && mkt.closed === false) {
          try {
            // Parse JSON strings for outcomes and clobTokenIds
            const outcomes = JSON.parse(mkt.outcomes);
            const clobTokenIds = JSON.parse(mkt.clobTokenIds);
            
            result.markets.push({
              conditionId: mkt.conditionId, // Keep the condition ID instead of market ID
              question: mkt.question,
              outcomes: outcomes,
              clobTokenIds: clobTokenIds
            });
          } catch (e) {
            console.error('Nevua: Error parsing market data:', e);
          }
        }
      });
    }

    return result;
  } catch (error) {
    console.error('Nevua: Error fetching market data:', error);
    return null;
  }
}

/**
 * Alert object structure definition
 * @typedef {Object} Alert
 * @property {string} id - Unique identifier for the alert (UUID)
 * @property {string} eventTitle - The event title from Next.js data
 * @property {string} slug - The event slug from Next.js data
 * @property {string} conditionId - The condition ID from the gamma API
 * @property {string} marketQuestion - The market title/question
 * @property {number} outcomeIndex - 0 for first outcome, 1 for second outcome
 * @property {string} outcomeName - Name of the selected outcome
 * @property {string} clobtokenId - The clob token ID for the selected outcome
 * @property {string} trigger - 'Recurring every 30 minutes' or 'One Time'
 * @property {string} priceAlert - 'Over' or 'Under'
 * @property {number} targetPrice - Target price threshold
 * @property {number} lastTriggeredAtMS - Timestamp of last trigger
 * @property {number} triggerCount - Number of times alert has been triggered
 * @property {string} status - 'Active' or 'Paused'
 * @property {boolean} closed - Whether the market is closed
 * @property {string|null} outcome - Final outcome if market is closed
 */

/**
 * Creates a new alert object with proper structure
 * @param {string} eventTitle - The event title
 * @param {string} slug - The event slug
 * @param {string} conditionId - The condition ID
 * @param {string} marketQuestion - The market title
 * @param {number} outcomeIndex - Index of the selected outcome
 * @param {string} outcomeName - Name of the selected outcome
 * @param {string} clobtokenId - The clob token ID for the outcome
 * @param {string} trigger - 'once' or 'recurring'
 * @param {string} priceAlert - 'over' or 'under'
 * @param {number} targetPrice - Target price
 * @returns {Alert} - New alert object
 */
function createAlert(eventTitle, slug, conditionId, marketQuestion, outcomeIndex, outcomeName, clobtokenId, trigger, priceAlert, targetPrice) {
  return {
    id: crypto.randomUUID(),
    eventTitle: eventTitle,
    slug: slug,
    conditionId: conditionId,
    marketQuestion: marketQuestion,
    outcomeIndex: outcomeIndex,
    outcomeName: outcomeName,
    clobtokenId: clobtokenId,
    trigger: trigger === 'once' ? 'One Time' : 'Recurring every 30 minutes',
    priceAlert: priceAlert.charAt(0).toUpperCase() + priceAlert.slice(1), // Capitalize first letter
    targetPrice: targetPrice,
    lastTriggeredAtMS: 0,
    triggerCount: 0,
    status: 'Active',
    closed: false,
    outcome: null
  };
}

/**
 * Injects the alert box widget into the trading container
 * @param {HTMLElement} container - The trade widget container element
 * @param {Object|null} marketData - The market data object containing page information
 */
function injectAlertBox(container, marketData = null) {
  // Check if alert box already exists - don't inject if it does
  if (document.getElementById("pm-alert-box")) {
    //console.log('Nevua: Alert box already exists, skipping injection');
    return;
  }
  
  // Use market data directly since it's already in the correct format
  const data = marketData || { eventTitle: '', markets: [] };
  
  const box = document.createElement("div");
  box.id = "pm-alert-box";
  box.style.cssText = `
    margin-top: 12px;
    padding: 16px;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    max-height: 400px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  `;

  // Allow alert creation on /event/<slug> and /sports pages
  const isEventPage = /^\/event\/[^/]+$/.test(window.location.pathname) || window.location.pathname.startsWith('/sports');
  
  box.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 16px; height: 100%;">
      <!-- Tab Header -->
      <div style="display: flex; align-items: center; gap: 0; border-bottom: 1px solid #e5e7eb; flex-shrink: 0;">
        <button id="pm-tab-create" class="pm-tab-button pm-tab-active" style="
          background: none;
          border: none;
          padding: 8px 16px;
          font-size: 14px;
          font-weight: 600;
          color: #111827;
          cursor: pointer;
          border-bottom: 2px solid #3b82f6;
          margin-bottom: -1px;
        ">Create Alert</button>
        <button id="pm-tab-alerts" class="pm-tab-button" style="
          background: none;
          border: none;
          padding: 8px 16px;
          font-size: 14px;
          font-weight: 500;
          color: #6b7280;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          margin-bottom: -1px;
        ">Manage Alerts (<span id="pm-alert-count">0</span>)</button>
        <button id="pm-tab-chevron" style="
          background: none;
          border: none;
          padding: 8px;
          color: #6b7280;
          cursor: pointer;
          margin-left: auto;
          margin-bottom: -1px;
          display: flex;
          align-items: center;
        " title="Collapse/Expand">
          <svg id="pm-chevron-icon" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.293 9.293L12 13.586 7.707 9.293 6.293 10.707 12 16.414 17.707 10.707z"></path>
          </svg>
        </button>
      </div>
      
      <!-- Create Alert Tab Content -->
      <div id="pm-create-tab-content" style="display: block; flex: 1; overflow-y: auto;">
        ${!isEventPage ? `
          <div style="
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            padding: 20px;
            text-align: center;
            color: #6b7280;
            font-size: 14px;
          ">
            Alerts are currently not supported for this page.
          </div>
        ` : `
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <!-- Market Row -->
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 14px; color: #374151; font-weight: 500; min-width: 60px;">Market:</span>
              <select id="pm-market-select" style="
                flex: 1;
                background: #f9fafb;
                border: 1px solid #d1d5db;
                border-radius: 8px;
                padding: 6px 10px;
                font-size: 14px;
                color: #374151;
                cursor: pointer;
                min-width: 0;
                text-overflow: ellipsis;
              ">
                <option value="" disabled selected>None</option>
              </select>
            </div>
            
            <!-- Outcome Row -->
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 14px; color: #374151; font-weight: 500; min-width: 60px;">Outcome:</span>
              <select id="pm-outcome-select" style="
                flex: 1;
                background: #f9fafb;
                border: 1px solid #d1d5db;
                border-radius: 8px;
                padding: 6px 10px;
                font-size: 14px;
                color: #374151;
                cursor: pointer;
              " disabled>
                <option value="" disabled selected>None</option>
              </select>
            </div>
            
            <!-- Trigger Row -->
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 14px; color: #374151; font-weight: 500; min-width: 60px;">Trigger:</span>
              <select id="pm-alert-frequency" style="
                flex: 1;
                background: #f9fafb;
                border: 1px solid #d1d5db;
                border-radius: 8px;
                padding: 6px 10px;
                font-size: 14px;
                color: #374151;
                cursor: pointer;
              ">
                <option value="once">One time</option>
                <option value="recurring">Recurring every 30 minutes</option>
              </select>
            </div>
            
            <!-- Price Alert Row (combined over/under and price) -->
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 14px; color: #374151; font-weight: 500; min-width: 60px;">Price Alert:</span>
              <select id="pm-alert-type" style="
                background: #f9fafb;
                border: 1px solid #d1d5db;
                border-radius: 8px;
                padding: 6px 10px;
                font-size: 14px;
                color: #374151;
                cursor: pointer;
                flex-shrink: 0;
              ">
                <option value="over">Over</option>
                <option value="under">Under</option>
              </select>
              
              <div style="
                display: flex;
                align-items: center;
                background: #f9fafb;
                border: 1px solid #d1d5db;
                border-radius: 8px;
                padding: 6px 10px;
                min-width: 100px;
                max-width: 120px;
                margin-left: auto;
              ">
                <input id="pm-alert-price" type="text" inputmode="decimal" autocomplete="off"
                  placeholder="0.0" style="
                    background: transparent;
                    border: none;
                    outline: none;
                    font-size: 14px;
                    color: #374151;
                    font-weight: 600;
                    text-align: right;
                    width: 60px;
                    flex: 1;
                  ">
                <span style="
                  font-size: 14px;
                  color: #374151;
                  font-weight: 600;
                  margin-left: 4px;
                ">¢</span>
              </div>
            </div>
          </div>
        `}

        <!-- Bottom Row: Branding and Create Button -->
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: auto; padding-top: 16px;">
          <div style="display: flex; flex-direction: column; align-items: flex-start; gap: 2px;">
            <span style="font-size: 10px; color: #d1d5db; font-weight: 400;">by <a href="https://nevua.markets" target="_blank" style="text-decoration: underline;">Nevua Markets</a></span>
            <a href="https://nevua.markets/terms.html" target="_blank" style="
              font-size: 10px; 
              color: #d1d5db; 
              font-weight: 400;
              text-decoration: underline;
              text-align: center;
              display: block;
              width: 100%;
            ">Terms Of Use</a>
          </div>
          
          ${isEventPage ? `
            <button id="pm-alert-set" disabled style="
              background: #9ca3af;
              color: white;
              border: none;
              border-radius: 8px;
              padding: 8px 16px;
              font-size: 14px;
              font-weight: 500;
              cursor: not-allowed;
              transition: background-color 0.2s;
              flex-shrink: 0;
            ">
              Create Alert
            </button>
          ` : ''}
        </div>
      </div>
      
      <!-- Active Alerts Tab Content -->
      <div id="pm-alerts-tab-content" style="display: none; flex: 1; overflow: hidden;">
        <div id="pm-alerts-summary" style="
          font-size: 12px;
          color: #6b7280;
          margin-bottom: 12px;
          padding: 0 4px;
        "></div>
        <div id="pm-alerts-list" style="
          max-height: 250px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding-right: 4px;
        ">
          <div id="pm-no-alerts" style="
            padding: 20px;
            text-align: center;
            color: #6b7280;
            font-size: 14px;
          ">No active alerts</div>
        </div>
      </div>
    </div>
  `;

  container.appendChild(box);

  // Only set up form handlers if on an event page
  if (isEventPage) {
    setupFormHandlers(box, data);
  }

  // Set up tab handlers
  setupTabHandlers(box);

  // Set up the callback for live updates
  renderAlertsListCallback = renderAlertsList;
  window.nevuaRenderAlertsListCallback = renderAlertsListCallback;

  // Initialize - load alerts from storage first
  loadAlertsFromStorage().then(savedAlerts => {
    activeAlerts = savedAlerts;
    window.nevuaActiveAlerts = activeAlerts;
    renderAlertsList();
    ensureSubscriptions();
    
    // Update badge count
    const activeCount = activeAlerts.filter(a => a.status === 'Active' && !a.closed).length;
    chrome.runtime.sendMessage({
      type: "update_badge",
      count: activeCount
    }, (response) => {
      if (chrome.runtime.lastError) {
        console.error('Nevua: Failed to update badge:', chrome.runtime.lastError);
      }
    });
  });
}

/**
 * Sets up form handlers for the alert box
 * @param {HTMLElement} box - The alert box container
 * @param {Object} marketData - The market data from the API
 */
function setupFormHandlers(box, marketData) {
  // Get references to form elements
  const marketSelect = box.querySelector("#pm-market-select");
  const outcomeSelect = box.querySelector("#pm-outcome-select");
  const createButton = box.querySelector("#pm-alert-set");

  // Populate market dropdown with real data
  if (marketData.markets && marketData.markets.length > 0) {
    // Clear any existing options first
    marketSelect.innerHTML = '<option value="" disabled selected>Select a market</option>';
    
    marketData.markets.forEach((market, index) => {
      const option = document.createElement('option');
      option.value = index.toString();
      option.textContent = market.question;
      option.title = market.question; // For tooltip on hover
      marketSelect.appendChild(option);
    });

    // Enable the market select
    marketSelect.disabled = false;
  } else {
    marketSelect.innerHTML = '<option value="" disabled selected>No markets available</option>';
    marketSelect.disabled = true;
  }

  // Market selection change handler
  marketSelect.addEventListener('change', function() {
    if (this.value !== "" && marketData.markets) {
      const marketIndex = parseInt(this.value);
      const selectedMarket = marketData.markets[marketIndex];
      
      if (selectedMarket && selectedMarket.outcomes) {
        // Enable outcome selector and populate with outcomes
        outcomeSelect.disabled = false;
        outcomeSelect.innerHTML = '';
        
        selectedMarket.outcomes.forEach((outcome, index) => {
          const option = document.createElement('option');
          option.value = index.toString();
          option.textContent = outcome;
          outcomeSelect.appendChild(option);
        });
        
        // Automatically select the first outcome
        if (selectedMarket.outcomes.length > 0) {
          outcomeSelect.value = '0';
        }
      }
      
      // Truncate market text if needed
      const selectedOption = this.options[this.selectedIndex];
      const fullText = selectedOption.title || selectedOption.textContent;
      if (fullText.length > 50) {
        selectedOption.textContent = fullText.substring(0, 47) + '...';
      }
    } else {
      // Reset and disable outcome selector
      outcomeSelect.innerHTML = '<option value="" disabled selected>None</option>';
      outcomeSelect.disabled = true;
    }
    updateButtonState();
  });

  // Outcome selection change handler
  outcomeSelect.addEventListener('change', updateButtonState);

  // Price input change handler
  box.querySelector("#pm-alert-price").addEventListener('input', function() {
    // Allow only numeric input with decimals
    let value = this.value.replace(/[^0-9.]/g, '');
    
    // Ensure only one decimal point
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }
    
    // Limit to reasonable range (0-100)
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 100) {
      value = "100";
    }
    
    this.value = value;
    updateButtonState();
  });

  // Set up create alert button click handler
  createButton.onclick = () => {
    if (createButton.disabled) return;
    
    const marketIndex = parseInt(marketSelect.value);
    const outcomeIndex = parseInt(outcomeSelect.value);
    const selectedMarket = marketData.markets[marketIndex];
    const frequency = box.querySelector("#pm-alert-frequency").value;
    const type = box.querySelector("#pm-alert-type").value;
    const target = parseFloat(box.querySelector("#pm-alert-price").value);
    
    if (!isNaN(target) && target >= 0 && selectedMarket) {
      const newAlert = createAlert(
        marketData.eventTitle,
        marketData.slug,
        selectedMarket.conditionId,
        selectedMarket.question,
        outcomeIndex,
        selectedMarket.outcomes[outcomeIndex],
        selectedMarket.clobTokenIds[outcomeIndex],
        frequency,
        type,
        target
      );
      
      activeAlerts.push(newAlert);
      window.nevuaActiveAlerts = activeAlerts;
      
      saveAlertsToStorage();
      renderAlertsList();
      ensureSubscriptions();
      
      // Reset form
      marketSelect.selectedIndex = 0;
      outcomeSelect.disabled = true;
      outcomeSelect.innerHTML = '<option value="" disabled selected>None</option>';
      box.querySelector("#pm-alert-price").value = '';
      updateButtonState();
    }
  };
}

/**
 * Sets up tab handlers for the alert box
 * @param {HTMLElement} box - The alert box container
 */
function setupTabHandlers(box) {
  const createTabButton = box.querySelector("#pm-tab-create");
  const alertsTabButton = box.querySelector("#pm-tab-alerts");
  const createTabContent = box.querySelector("#pm-create-tab-content");
  const alertsTabContent = box.querySelector("#pm-alerts-tab-content");
  const chevronButton = box.querySelector("#pm-tab-chevron");
  const chevronIcon = box.querySelector("#pm-chevron-icon");

  let isExpanded = true;

  function updateChevronIcon() {
    if (isExpanded) {
      // Chevron down (expanded state)
      chevronIcon.innerHTML = '<path d="M16.293 9.293L12 13.586 7.707 9.293 6.293 10.707 12 16.414 17.707 10.707z"></path>';
    } else {
      // Chevron up (collapsed state)
      chevronIcon.innerHTML = '<path d="M7.707 14.707L12 10.414 16.293 14.707 17.707 13.293 12 7.586 6.293 13.293z"></path>';
    }
  }

  function setExpandState(expanded) {
    isExpanded = expanded;
    updateChevronIcon();
    
    if (isExpanded) {
      createTabContent.style.display = createTabButton.classList.contains('pm-tab-active') ? 'block' : 'none';
      alertsTabContent.style.display = alertsTabButton.classList.contains('pm-tab-active') ? 'block' : 'none';
    } else {
      createTabContent.style.display = 'none';
      alertsTabContent.style.display = 'none';
    }
    
    saveExpandStateToStorage(isExpanded);
  }

  function switchTab(tabName, forceExpand = false) {
    // If collapsed and switching tabs, expand first
    if (!isExpanded && forceExpand) {
      setExpandState(true);
    }

    if (tabName === 'create') {
      createTabButton.classList.add('pm-tab-active');
      alertsTabButton.classList.remove('pm-tab-active');
      createTabButton.style.borderBottomColor = '#3b82f6';
      createTabButton.style.color = '#111827';
      createTabButton.style.fontWeight = '600';
      alertsTabButton.style.borderBottomColor = 'transparent';
      alertsTabButton.style.color = '#6b7280';
      alertsTabButton.style.fontWeight = '500';
      
      if (isExpanded) {
        createTabContent.style.display = 'block';
        alertsTabContent.style.display = 'none';
      }
    } else {
      alertsTabButton.classList.add('pm-tab-active');
      createTabButton.classList.remove('pm-tab-active');
      alertsTabButton.style.borderBottomColor = '#3b82f6';
      alertsTabButton.style.color = '#111827';
      alertsTabButton.style.fontWeight = '600';
      createTabButton.style.borderBottomColor = 'transparent';
      createTabButton.style.color = '#6b7280';
      createTabButton.style.fontWeight = '500';
      
      if (isExpanded) {
        alertsTabContent.style.display = 'block';
        createTabContent.style.display = 'none';
      }
      
      // Refresh alerts list when switching to alerts tab to ensure it's up to date
      renderAlertsList();
    }
  }

  // Tab button event listeners - expand if collapsed when clicking
  createTabButton.addEventListener('click', () => switchTab('create', true));
  alertsTabButton.addEventListener('click', () => switchTab('alerts', true));

  // Chevron button event listener
  chevronButton.addEventListener('click', () => {
    setExpandState(!isExpanded);
  });

  // Load and apply saved expand state
  loadExpandStateFromStorage().then(savedExpanded => {
    setExpandState(savedExpanded);
  });
}

/**
 * Updates the create alert button state based on form validation
 */
function updateButtonState() {
  const box = document.getElementById("pm-alert-box");
  if (!box) return;

  const market = box.querySelector("#pm-market-select").value;
  const outcome = box.querySelector("#pm-outcome-select").value;
  const price = box.querySelector("#pm-alert-price").value;
  const createButton = box.querySelector("#pm-alert-set");
  
  const isValid = market && market !== "" && outcome && outcome !== "" && price && !isNaN(parseFloat(price));
  
  createButton.disabled = !isValid;
  if (isValid) {
    createButton.style.backgroundColor = "#3b82f6";
    createButton.style.cursor = "pointer";
    createButton.onmouseover = () => createButton.style.backgroundColor = "#2563eb";
    createButton.onmouseout = () => createButton.style.backgroundColor = "#3b82f6";
  } else {
    createButton.style.backgroundColor = "#9ca3af";
    createButton.style.cursor = "not-allowed";
    createButton.onmouseover = null;
    createButton.onmouseout = null;
  }
}

/**
 * Renders the active alerts list while preserving scroll position
 */
function renderAlertsList() {
  const alertsList = document.getElementById('pm-alerts-list');
  const noAlertsMsg = document.getElementById('pm-no-alerts');
  const summaryElement = document.getElementById('pm-alerts-summary');
  
  // Return early if elements don't exist (widget not loaded yet)
  if (!alertsList || !noAlertsMsg) {
    return;
  }
  
  // Update summary line and create bulk actions row
  if (summaryElement) {
    const activeAlertsCount = activeAlerts.filter(a => a.status === 'Active' && !a.closed).length;
    
    // Check if we should show bulk actions
    const shouldShowBulkActions = activeAlerts.length > 0;
    
    if (shouldShowBulkActions) {
      // Create bulk actions and summary row
      summaryElement.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <button id="pm-bulk-clear-btn" style="
              background: #9ca3af;
              color: white;
              border: none;
              border-radius: 4px;
              padding: 4px 8px;
              font-size: 12px;
              cursor: not-allowed;
              font-weight: 500;
            " disabled>Clear</button>
            <select id="pm-bulk-clear-select" style="
              background: #f9fafb;
              border: 1px solid #d1d5db;
              border-radius: 4px;
              padding: 4px 6px;
              font-size: 12px;
              color: #6b7280;
              cursor: pointer;
            ">
              <option value="" selected style="color: #9ca3af;">None</option>
              <option value="closed">Closed</option>
              <option value="paused">Paused</option>
              <option value="all">All alerts</option>
            </select>
          </div>
          <div style="color: #6b7280; font-size: 12px;">
            Active: ${activeAlertsCount}
          </div>
        </div>
      `;
      
      // Add event listeners for bulk actions
      const bulkClearBtn = document.getElementById('pm-bulk-clear-btn');
      const bulkClearSelect = document.getElementById('pm-bulk-clear-select');
      
      bulkClearSelect.addEventListener('change', function() {
        if (this.value === '') {
          bulkClearBtn.disabled = true;
          bulkClearBtn.style.background = '#9ca3af';
          bulkClearBtn.style.cursor = 'not-allowed';
        } else {
          bulkClearBtn.disabled = false;
          bulkClearBtn.style.background = '#dc2626';
          bulkClearBtn.style.cursor = 'pointer';
          
          // Add hover effect
          bulkClearBtn.onmouseover = () => bulkClearBtn.style.background = '#b91c1c';
          bulkClearBtn.onmouseout = () => bulkClearBtn.style.background = '#dc2626';
        }
      });
      
      bulkClearBtn.addEventListener('click', function() {
        if (this.disabled) return;
        
        const clearType = bulkClearSelect.value;
        let alertsToDelete = [];
        
        switch (clearType) {
          case 'closed':
            alertsToDelete = activeAlerts.filter(a => a.closed);
            break;
          case 'paused':
            alertsToDelete = activeAlerts.filter(a => a.status === 'Paused');
            break;
          case 'all':
            alertsToDelete = [...activeAlerts];
            break;
        }
        
        if (alertsToDelete.length > 0) {
          // Remove the alerts
          alertsToDelete.forEach(alertToDelete => {
            const index = activeAlerts.findIndex(a => a.id === alertToDelete.id);
            if (index !== -1) {
              activeAlerts.splice(index, 1);
            }
          });
          window.nevuaActiveAlerts = activeAlerts;
          
          // Save and refresh
          saveAlertsToStorage();
          renderAlertsList();
          ensureSubscriptions();
        }
        
        // Reset selection
        bulkClearSelect.value = '';
        bulkClearBtn.disabled = true;
        bulkClearBtn.style.background = '#9ca3af';
        bulkClearBtn.style.cursor = 'not-allowed';
      });
    } else {
      // No alerts, just show the summary
      summaryElement.textContent = `Active: ${activeAlertsCount}`;
    }
  }
  
  // Preserve scroll position
  const currentScrollTop = alertsList.scrollTop;
  
  if (activeAlerts.length === 0) {
    noAlertsMsg.style.display = 'block';
    // Hide all alert items
    alertsList.querySelectorAll('.pm-alert-item').forEach(item => item.remove());
  } else {
    noAlertsMsg.style.display = 'none';
    
    // Clear existing items
    alertsList.querySelectorAll('.pm-alert-item').forEach(item => item.remove());
    
    // Add alert items
    activeAlerts.forEach(alert => {
      const alertItem = document.createElement('div');
      alertItem.className = 'pm-alert-item';
      alertItem.style.cssText = `
        display: flex;
        align-items: flex-start;
        gap: 8px;
        padding: 12px;
        background: #f9fafb;
        border: 1px solid #e5e7eb;
        border-radius: 6px;
        font-size: 12px;
      `;
      
      const statusDot = alert.status === 'Active' ? '#10b981' : '#6b7280';
      const truncatedTitle = alert.marketQuestion.length > 30 ? alert.marketQuestion.substring(0, 27) + '...' : alert.marketQuestion;
      
      // Format last triggered date
      const lastTriggeredDate = alert.lastTriggeredAtMS > 0 ? 
        new Date(alert.lastTriggeredAtMS).toLocaleString() : 'Never';
      
      // Show event title if different from market question (also truncated)
      const eventLine = alert.eventTitle !== alert.marketQuestion ? 
        `<div style="color: #6b7280; font-size: 11px; margin-bottom: 2px;" title="${alert.eventTitle}">Event: ${alert.eventTitle.length > 30 ? alert.eventTitle.substring(0, 27) + '...' : alert.eventTitle}</div>` : '';
      
      // Check if market is closed and show appropriate status
      const isMarketClosed = alert.closed;
      const toggleButtonDisabled = isMarketClosed ? 'disabled' : '';
      const toggleButtonStyle = isMarketClosed ? 
        'opacity: 0.5; cursor: not-allowed;' : 'cursor: pointer;';
      const toggleButtonTitle = isMarketClosed ? 
        'Market is closed' : (alert.status === 'Active' ? 'Pause this alert' : 'Resume this alert');
      
      alertItem.innerHTML = `
        <div style="
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: ${statusDot};
          flex-shrink: 0;
          margin-top: 4px;
        "></div>
        <div style="flex: 1; overflow: hidden; line-height: 1.4;">
          <!-- Title row with buttons -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
            <div style="font-weight: 500; color: #374151; flex: 1; overflow: hidden;" title="${alert.marketQuestion}">
              <a href="https://polymarket.com/event/${alert.slug}" target="_blank" style="color: #3b82f6; text-decoration: none;">${truncatedTitle}</a>
            </div>
            <div style="display: flex; gap: 4px; flex-shrink: 0; margin-left: 8px;">
              <button class="pm-toggle-alert" data-id="${alert.id}" ${toggleButtonDisabled} style="
                background: transparent;
                color: #374151;
                border: 1px solid #d1d5db;
                border-radius: 4px;
                padding: 4px 6px;
                font-size: 12px;
                flex-shrink: 0;
                min-width: 28px;
                ${toggleButtonStyle}
              " title="${toggleButtonTitle}">${alert.status === 'Active' ? '⏸️' : '▶️'}</button>
              <button class="pm-delete-alert" data-id="${alert.id}" style="
                background: transparent;
                color: #374151;
                border: 1px solid #d1d5db;
                border-radius: 4px;
                padding: 4px 6px;
                font-size: 12px;
                cursor: pointer;
                flex-shrink: 0;
                min-width: 28px;
              " title="Delete this alert permanently">🗑️</button>
            </div>
          </div>
          
          <!-- Event line (if different) -->
          ${eventLine}
          
          ${isMarketClosed ? `
            <!-- Market closed status -->
            <div style="color: #dc2626; font-size: 11px; margin-bottom: 2px; font-weight: 600;" title="This market has been resolved">
              Market closed: Outcome > ${alert.outcome}
            </div>
          ` : `
            <!-- Outcome and Price row -->
            <div style="color: #6b7280; font-size: 11px; margin-bottom: 2px;" title="The outcome you're betting on and price threshold">
              <span>Outcome: ${alert.outcomeName}</span>
              <span style="margin-left: 8px;">Price ${alert.priceAlert.toLowerCase()} ${alert.targetPrice}¢</span>
            </div>
            
            <!-- Trigger row -->
            <div style="color: #6b7280; font-size: 11px; margin-bottom: 2px;" title="How often this alert will trigger">
              <span>Trigger: ${alert.trigger}</span>
            </div>
          `}
          
          <!-- Last triggered row -->
          <div style="color: #6b7280; font-size: 11px;" title="When this alert was last triggered">
            <span>Last triggered: ${lastTriggeredDate} (${alert.triggerCount} times)</span>
          </div>
        </div>
      `;
      
      alertsList.appendChild(alertItem);
    });
    
    // Add event listeners for toggle and delete buttons
    alertsList.querySelectorAll('.pm-toggle-alert').forEach(button => {
      button.addEventListener('click', function() {
        const alertId = this.dataset.id;
        toggleAlert(alertId);
      });
    });
    
    alertsList.querySelectorAll('.pm-delete-alert').forEach(button => {
      button.addEventListener('click', function() {
        const alertId = this.dataset.id;
        deleteAlert(alertId);
      });
    });
    
    // Restore scroll position
    setTimeout(() => {
      alertsList.scrollTop = currentScrollTop;
    }, 0);
  }
  
  updateAlertCount();
}

/**
 * Toggles an alert's active state
 * @param {string} alertId - The ID of the alert to toggle
 */
function toggleAlert(alertId) {
  const alert = activeAlerts.find(a => a.id === alertId);
  if (alert && !alert.closed) { // Don't allow toggling closed markets
    alert.status = alert.status === 'Active' ? 'Paused' : 'Active';
    saveAlertsToStorage();
    renderAlertsList();
    ensureSubscriptions();
  }
}

/**
 * Deletes an alert
 * @param {string} alertId - The ID of the alert to delete
 */
function deleteAlert(alertId) {
  const alertIndex = activeAlerts.findIndex(a => a.id === alertId);
  if (alertIndex !== -1) {
    activeAlerts.splice(alertIndex, 1);
    window.nevuaActiveAlerts = activeAlerts;
    saveAlertsToStorage();
    renderAlertsList();
    ensureSubscriptions();
  }
}

/**
 * Updates the alert count in the tab header (shows only active, non-closed alerts)
 */
function updateAlertCount() {
  const countElement = document.getElementById('pm-alert-count');
  if (!countElement) return;
  
  const oldCount = parseInt(countElement.textContent) || 0;
  const newCount = activeAlerts.filter(a => a.status === 'Active' && !a.closed).length;
  
  countElement.textContent = newCount;
  
  // Brief visual indication when count changes
  if (oldCount !== newCount) {
    countElement.style.fontWeight = 'bold';
    countElement.style.color = '#3b82f6';
    setTimeout(() => {
      countElement.style.fontWeight = '';
      countElement.style.color = '';
    }, 1000);
  }
}