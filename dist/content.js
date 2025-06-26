var process = { env: { LOG_LEVEL: "warn" } };
(() => {
  // content.js
  async function waitForTradeBox() {
    if (alertBoxInjected || document.getElementById("pm-alert-box")) {
      return;
    }
    const container = document.querySelector("#trade-widget");
    if (container) {
      const slug = getSlugFromUrl();
      if (slug) {
        const marketData = await fetchMarketDataWithCache(slug);
        injectAlertBox(container, marketData);
        alertBoxInjected = true;
        return;
      }
      injectAlertBox(container, null);
      alertBoxInjected = true;
      return;
    }
    setTimeout(() => {
      if (!alertBoxInjected && !document.getElementById("pm-alert-box")) {
        waitForTradeBox();
      }
    }, 500);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      alertBoxInjected = false;
      waitForTradeBox();
      startPolling();
    });
  } else {
    alertBoxInjected = false;
    waitForTradeBox();
    startPolling();
  }
  var pollingInterval = null;
  function startPolling() {
    if (pollingInterval) {
      clearInterval(pollingInterval);
    }
    pollingInterval = setInterval(() => {
      if (!alertBoxInjected && !document.getElementById("pm-alert-box")) {
        waitForTradeBox();
      }
    }, 1e3);
  }
  window.addEventListener("popstate", () => {
    alertBoxInjected = false;
    startPolling();
  });
  var lastUrl = location.href;
  var lastSlug = getSlugFromUrl();
  setInterval(() => {
    const currentUrl = location.href;
    const currentSlug = getSlugFromUrl();
    if (currentUrl !== lastUrl) {
      lastUrl = currentUrl;
      alertBoxInjected = false;
      const existingBox = document.getElementById("pm-alert-box");
      if (existingBox) existingBox.remove();
      if (currentSlug !== lastSlug && lastSlug) {
        marketDataCache.delete(lastSlug);
      }
      lastSlug = currentSlug;
      startPolling();
    } else if (currentSlug !== lastSlug) {
      alertBoxInjected = false;
      const existingBox2 = document.getElementById("pm-alert-box");
      if (existingBox2) existingBox2.remove();
      if (lastSlug) {
        marketDataCache.delete(lastSlug);
      }
      lastSlug = currentSlug;
      startPolling();
    }
  }, 1e3);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && renderAlertsListCallback) {
      setTimeout(() => {
        renderAlertsListCallback();
      }, 100);
    }
  });
  var activeAlerts = [];
  var renderAlertsListCallback = null;
  var marketDataCache = /* @__PURE__ */ new Map();
  var lastFetchTime = /* @__PURE__ */ new Map();
  var pendingRequests = /* @__PURE__ */ new Map();
  var RATE_LIMIT_MS = 5e3;
  var CACHE_TTL_MS = 5 * 60 * 1e3;
  async function ensureSubscriptions() {
    const needed = activeAlerts.filter((alert) => alert.status === "Active" && !alert.closed).map((alert) => alert.clobtokenId);
    chrome.runtime.sendMessage({
      type: "update_subscriptions",
      needed
    }, (response) => {
      if (chrome.runtime.lastError) {
        console.error("Nevua: Failed to update subscriptions:", chrome.runtime.lastError);
      }
    });
  }
  function saveAlertsToStorage() {
    chrome.storage.local.set({ "polymarket_alerts": activeAlerts }, () => {
      if (chrome.runtime.lastError) {
        console.error("Nevua: Error saving alerts:", chrome.runtime.lastError);
        return;
      }
      chrome.runtime.sendMessage({
        type: "alert_updated",
        alerts: activeAlerts
      }, (response) => {
        if (chrome.runtime.lastError) {
          console.error("Nevua: Failed to broadcast alert update:", chrome.runtime.lastError);
        }
      });
    });
  }
  function loadAlertsFromStorage() {
    return new Promise((resolve) => {
      chrome.storage.local.get(["polymarket_alerts"], (result) => {
        if (chrome.runtime.lastError) {
          console.error("Nevua: Error loading alerts:", chrome.runtime.lastError);
          resolve([]);
          return;
        }
        const savedAlerts = result.polymarket_alerts || [];
        savedAlerts.forEach((alert) => {
          if (alert.status === "active") {
            alert.status = "Active";
          } else if (alert.status === "paused") {
            alert.status = "Paused";
          }
        });
        resolve(savedAlerts);
      });
    });
  }
  function saveExpandStateToStorage(isExpanded) {
    chrome.storage.local.set({ "polymarket_widget_expanded": isExpanded }, () => {
      if (chrome.runtime.lastError) {
        console.error("Nevua: Error saving widget expand state:", chrome.runtime.lastError);
      }
    });
  }
  function loadExpandStateFromStorage() {
    return new Promise((resolve) => {
      chrome.storage.local.get(["polymarket_widget_expanded"], (result) => {
        if (chrome.runtime.lastError) {
          console.error("Nevua: Error loading widget expand state:", chrome.runtime.lastError);
          resolve(true);
          return;
        }
        const isExpanded = result.polymarket_widget_expanded !== false;
        resolve(isExpanded);
      });
    });
  }
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "price_updates") {
      handlePriceUpdates(message.events);
      return false;
    }
    if (message.type === "alert_update") {
      activeAlerts = message.alerts;
      if (renderAlertsListCallback) renderAlertsListCallback();
      ensureSubscriptions();
      return false;
    }
  });
  async function handlePriceUpdates(events) {
    if (renderAlertsListCallback) {
      setTimeout(() => {
        loadAlertsFromStorage().then((alerts) => {
          activeAlerts = alerts;
          renderAlertsListCallback();
        });
      }, 100);
    }
  }
  function getSlugFromUrl() {
    const eventMatch = window.location.pathname.match(/^\/event\/([^/]+)$/);
    if (eventMatch) {
      return eventMatch[1];
    }
    if (window.location.pathname.startsWith("/sports")) {
      const accordionItems = Array.from(document.querySelectorAll('div[id^="sports-accordion-item-"]'));
      if (accordionItems.length === 0) {
        return null;
      }
      let target = null;
      if (accordionItems.length === 1) {
        target = accordionItems[0];
      } else {
        target = accordionItems.find((el) => el.getAttribute("data-state") === "open") || accordionItems[0];
        if (target && target.getAttribute("data-state") !== "open") {
        }
      }
      const id = target.id || "";
      const prefix = "sports-accordion-item-";
      if (id.startsWith(prefix)) {
        let slugValue = id.slice(prefix.length);
        if (slugValue.endsWith("-moneyline")) {
          slugValue = slugValue.replace(/-moneyline$/, "");
        }
        return slugValue;
      }
    }
    return null;
  }
  async function fetchMarketDataWithCache(slug) {
    const now = Date.now();
    const cacheKey = slug;
    const cachedData = marketDataCache.get(cacheKey);
    if (cachedData && now - cachedData.timestamp < CACHE_TTL_MS) {
      return cachedData.data;
    }
    const pendingRequest = pendingRequests.get(cacheKey);
    if (pendingRequest) {
      return await pendingRequest;
    }
    const lastFetch = lastFetchTime.get(cacheKey) || 0;
    if (now - lastFetch < RATE_LIMIT_MS) {
      return cachedData ? cachedData.data : null;
    }
    const fetchPromise = fetchMarketData(slug).then((data) => {
      lastFetchTime.set(cacheKey, now);
      if (data) {
        marketDataCache.set(cacheKey, { data, timestamp: now });
      }
      pendingRequests.delete(cacheKey);
      return data;
    }).catch((error) => {
      pendingRequests.delete(cacheKey);
      throw error;
    });
    pendingRequests.set(cacheKey, fetchPromise);
    return await fetchPromise;
  }
  async function fetchMarketData(slug) {
    try {
      const response = await fetch(`https://gamma-api.polymarket.com/events?slug=${slug}`, {
        headers: {
          "User-Agent": "Nevua-Markets-Chrome-Extension/1.0"
        }
      });
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }
      const data = await response.json();
      if (!data || !Array.isArray(data) || data.length === 0) {
        console.error("Nevua: Invalid API response format");
        return null;
      }
      const event = data[0];
      const result = {
        eventTitle: event.title,
        slug: event.slug,
        markets: []
      };
      if (event.markets && Array.isArray(event.markets)) {
        event.markets.forEach((mkt) => {
          if (mkt.active === true && mkt.closed === false) {
            try {
              const outcomes = JSON.parse(mkt.outcomes);
              const clobTokenIds = JSON.parse(mkt.clobTokenIds);
              result.markets.push({
                conditionId: mkt.conditionId,
                // Keep the condition ID instead of market ID
                question: mkt.question,
                outcomes,
                clobTokenIds
              });
            } catch (e) {
              console.error("Nevua: Error parsing market data:", e);
            }
          }
        });
      }
      return result;
    } catch (error) {
      console.error("Nevua: Error fetching market data:", error);
      return null;
    }
  }
  function createAlert(eventTitle, slug, conditionId, marketQuestion, outcomeIndex, outcomeName, clobtokenId, trigger, priceAlert, targetPrice) {
    return {
      id: crypto.randomUUID(),
      eventTitle,
      slug,
      conditionId,
      marketQuestion,
      outcomeIndex,
      outcomeName,
      clobtokenId,
      trigger: trigger === "once" ? "One Time" : "Recurring every 30 minutes",
      priceAlert: priceAlert.charAt(0).toUpperCase() + priceAlert.slice(1),
      // Capitalize first letter
      targetPrice,
      lastTriggeredAtMS: 0,
      triggerCount: 0,
      status: "Active",
      closed: false,
      outcome: null
    };
  }
  function injectAlertBox(container, marketData = null) {
    if (document.getElementById("pm-alert-box")) {
      return;
    }
    const data = marketData || { eventTitle: "", markets: [] };
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
    const isEventPage = /^\/event\/[^/]+$/.test(window.location.pathname) || window.location.pathname.startsWith("/sports");
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
                ">\xA2</span>
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
          ` : ""}
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
    if (isEventPage) {
      setupFormHandlers(box, data);
    }
    setupTabHandlers(box);
    renderAlertsListCallback = renderAlertsList;
    loadAlertsFromStorage().then((savedAlerts) => {
      activeAlerts = savedAlerts;
      renderAlertsList();
      ensureSubscriptions();
      const activeCount = activeAlerts.filter((a) => a.status === "Active" && !a.closed).length;
      chrome.runtime.sendMessage({
        type: "update_badge",
        count: activeCount
      }, (response) => {
        if (chrome.runtime.lastError) {
          console.error("Nevua: Failed to update badge:", chrome.runtime.lastError);
        }
      });
    });
  }
  function setupFormHandlers(box, marketData) {
    const marketSelect = box.querySelector("#pm-market-select");
    const outcomeSelect = box.querySelector("#pm-outcome-select");
    const createButton = box.querySelector("#pm-alert-set");
    if (marketData.markets && marketData.markets.length > 0) {
      marketSelect.innerHTML = '<option value="" disabled selected>Select a market</option>';
      marketData.markets.forEach((market, index) => {
        const option = document.createElement("option");
        option.value = index.toString();
        option.textContent = market.question;
        option.title = market.question;
        marketSelect.appendChild(option);
      });
      marketSelect.disabled = false;
    } else {
      marketSelect.innerHTML = '<option value="" disabled selected>No markets available</option>';
      marketSelect.disabled = true;
    }
    marketSelect.addEventListener("change", function() {
      if (this.value !== "" && marketData.markets) {
        const marketIndex = parseInt(this.value);
        const selectedMarket = marketData.markets[marketIndex];
        if (selectedMarket && selectedMarket.outcomes) {
          outcomeSelect.disabled = false;
          outcomeSelect.innerHTML = "";
          selectedMarket.outcomes.forEach((outcome, index) => {
            const option = document.createElement("option");
            option.value = index.toString();
            option.textContent = outcome;
            outcomeSelect.appendChild(option);
          });
          if (selectedMarket.outcomes.length > 0) {
            outcomeSelect.value = "0";
          }
        }
        const selectedOption = this.options[this.selectedIndex];
        const fullText = selectedOption.title || selectedOption.textContent;
        if (fullText.length > 50) {
          selectedOption.textContent = fullText.substring(0, 47) + "...";
        }
      } else {
        outcomeSelect.innerHTML = '<option value="" disabled selected>None</option>';
        outcomeSelect.disabled = true;
      }
      updateButtonState();
    });
    outcomeSelect.addEventListener("change", updateButtonState);
    box.querySelector("#pm-alert-price").addEventListener("input", function() {
      let value = this.value.replace(/[^0-9.]/g, "");
      const parts = value.split(".");
      if (parts.length > 2) {
        value = parts[0] + "." + parts.slice(1).join("");
      }
      const numValue = parseFloat(value);
      if (!isNaN(numValue) && numValue > 100) {
        value = "100";
      }
      this.value = value;
      updateButtonState();
    });
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
        saveAlertsToStorage();
        renderAlertsList();
        ensureSubscriptions();
        marketSelect.selectedIndex = 0;
        outcomeSelect.disabled = true;
        outcomeSelect.innerHTML = '<option value="" disabled selected>None</option>';
        box.querySelector("#pm-alert-price").value = "";
        updateButtonState();
      }
    };
  }
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
        chevronIcon.innerHTML = '<path d="M16.293 9.293L12 13.586 7.707 9.293 6.293 10.707 12 16.414 17.707 10.707z"></path>';
      } else {
        chevronIcon.innerHTML = '<path d="M7.707 14.707L12 10.414 16.293 14.707 17.707 13.293 12 7.586 6.293 13.293z"></path>';
      }
    }
    function setExpandState(expanded) {
      isExpanded = expanded;
      updateChevronIcon();
      if (isExpanded) {
        createTabContent.style.display = createTabButton.classList.contains("pm-tab-active") ? "block" : "none";
        alertsTabContent.style.display = alertsTabButton.classList.contains("pm-tab-active") ? "block" : "none";
      } else {
        createTabContent.style.display = "none";
        alertsTabContent.style.display = "none";
      }
      saveExpandStateToStorage(isExpanded);
    }
    function switchTab(tabName, forceExpand = false) {
      if (!isExpanded && forceExpand) {
        setExpandState(true);
      }
      if (tabName === "create") {
        createTabButton.classList.add("pm-tab-active");
        alertsTabButton.classList.remove("pm-tab-active");
        createTabButton.style.borderBottomColor = "#3b82f6";
        createTabButton.style.color = "#111827";
        createTabButton.style.fontWeight = "600";
        alertsTabButton.style.borderBottomColor = "transparent";
        alertsTabButton.style.color = "#6b7280";
        alertsTabButton.style.fontWeight = "500";
        if (isExpanded) {
          createTabContent.style.display = "block";
          alertsTabContent.style.display = "none";
        }
      } else {
        alertsTabButton.classList.add("pm-tab-active");
        createTabButton.classList.remove("pm-tab-active");
        alertsTabButton.style.borderBottomColor = "#3b82f6";
        alertsTabButton.style.color = "#111827";
        alertsTabButton.style.fontWeight = "600";
        createTabButton.style.borderBottomColor = "transparent";
        createTabButton.style.color = "#6b7280";
        createTabButton.style.fontWeight = "500";
        if (isExpanded) {
          alertsTabContent.style.display = "block";
          createTabContent.style.display = "none";
        }
        renderAlertsList();
      }
    }
    createTabButton.addEventListener("click", () => switchTab("create", true));
    alertsTabButton.addEventListener("click", () => switchTab("alerts", true));
    chevronButton.addEventListener("click", () => {
      setExpandState(!isExpanded);
    });
    loadExpandStateFromStorage().then((savedExpanded) => {
      setExpandState(savedExpanded);
    });
  }
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
  function renderAlertsList() {
    const alertsList = document.getElementById("pm-alerts-list");
    const noAlertsMsg = document.getElementById("pm-no-alerts");
    const summaryElement = document.getElementById("pm-alerts-summary");
    if (!alertsList || !noAlertsMsg) {
      return;
    }
    if (summaryElement) {
      const activeAlertsCount = activeAlerts.filter((a) => a.status === "Active" && !a.closed).length;
      const shouldShowBulkActions = activeAlerts.length > 0;
      if (shouldShowBulkActions) {
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
        const bulkClearBtn = document.getElementById("pm-bulk-clear-btn");
        const bulkClearSelect = document.getElementById("pm-bulk-clear-select");
        bulkClearSelect.addEventListener("change", function() {
          if (this.value === "") {
            bulkClearBtn.disabled = true;
            bulkClearBtn.style.background = "#9ca3af";
            bulkClearBtn.style.cursor = "not-allowed";
          } else {
            bulkClearBtn.disabled = false;
            bulkClearBtn.style.background = "#dc2626";
            bulkClearBtn.style.cursor = "pointer";
            bulkClearBtn.onmouseover = () => bulkClearBtn.style.background = "#b91c1c";
            bulkClearBtn.onmouseout = () => bulkClearBtn.style.background = "#dc2626";
          }
        });
        bulkClearBtn.addEventListener("click", function() {
          if (this.disabled) return;
          const clearType = bulkClearSelect.value;
          let alertsToDelete = [];
          switch (clearType) {
            case "closed":
              alertsToDelete = activeAlerts.filter((a) => a.closed);
              break;
            case "paused":
              alertsToDelete = activeAlerts.filter((a) => a.status === "Paused");
              break;
            case "all":
              alertsToDelete = [...activeAlerts];
              break;
          }
          if (alertsToDelete.length > 0) {
            alertsToDelete.forEach((alertToDelete) => {
              const index = activeAlerts.findIndex((a) => a.id === alertToDelete.id);
              if (index !== -1) {
                activeAlerts.splice(index, 1);
              }
            });
            saveAlertsToStorage();
            renderAlertsList();
            ensureSubscriptions();
          }
          bulkClearSelect.value = "";
          bulkClearBtn.disabled = true;
          bulkClearBtn.style.background = "#9ca3af";
          bulkClearBtn.style.cursor = "not-allowed";
        });
      } else {
        summaryElement.textContent = `Active: ${activeAlertsCount}`;
      }
    }
    const currentScrollTop = alertsList.scrollTop;
    if (activeAlerts.length === 0) {
      noAlertsMsg.style.display = "block";
      alertsList.querySelectorAll(".pm-alert-item").forEach((item) => item.remove());
    } else {
      noAlertsMsg.style.display = "none";
      alertsList.querySelectorAll(".pm-alert-item").forEach((item) => item.remove());
      activeAlerts.forEach((alert) => {
        const alertItem = document.createElement("div");
        alertItem.className = "pm-alert-item";
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
        const statusDot = alert.status === "Active" ? "#10b981" : "#6b7280";
        const truncatedTitle = alert.marketQuestion.length > 30 ? alert.marketQuestion.substring(0, 27) + "..." : alert.marketQuestion;
        const lastTriggeredDate = alert.lastTriggeredAtMS > 0 ? new Date(alert.lastTriggeredAtMS).toLocaleString() : "Never";
        const eventLine = alert.eventTitle !== alert.marketQuestion ? `<div style="color: #6b7280; font-size: 11px; margin-bottom: 2px;" title="${alert.eventTitle}">Event: ${alert.eventTitle.length > 30 ? alert.eventTitle.substring(0, 27) + "..." : alert.eventTitle}</div>` : "";
        const isMarketClosed = alert.closed;
        const toggleButtonDisabled = isMarketClosed ? "disabled" : "";
        const toggleButtonStyle = isMarketClosed ? "opacity: 0.5; cursor: not-allowed;" : "cursor: pointer;";
        const toggleButtonTitle = isMarketClosed ? "Market is closed" : alert.status === "Active" ? "Pause this alert" : "Resume this alert";
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
              " title="${toggleButtonTitle}">${alert.status === "Active" ? "\u23F8\uFE0F" : "\u25B6\uFE0F"}</button>
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
              " title="Delete this alert permanently">\u{1F5D1}\uFE0F</button>
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
              <span style="margin-left: 8px;">Price ${alert.priceAlert.toLowerCase()} ${alert.targetPrice}\xA2</span>
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
      alertsList.querySelectorAll(".pm-toggle-alert").forEach((button) => {
        button.addEventListener("click", function() {
          const alertId = this.dataset.id;
          toggleAlert(alertId);
        });
      });
      alertsList.querySelectorAll(".pm-delete-alert").forEach((button) => {
        button.addEventListener("click", function() {
          const alertId = this.dataset.id;
          deleteAlert(alertId);
        });
      });
      setTimeout(() => {
        alertsList.scrollTop = currentScrollTop;
      }, 0);
    }
    updateAlertCount();
  }
  function toggleAlert(alertId) {
    const alert = activeAlerts.find((a) => a.id === alertId);
    if (alert && !alert.closed) {
      alert.status = alert.status === "Active" ? "Paused" : "Active";
      saveAlertsToStorage();
      renderAlertsList();
      ensureSubscriptions();
    }
  }
  function deleteAlert(alertId) {
    const alertIndex = activeAlerts.findIndex((a) => a.id === alertId);
    if (alertIndex !== -1) {
      activeAlerts.splice(alertIndex, 1);
      saveAlertsToStorage();
      renderAlertsList();
      ensureSubscriptions();
    }
  }
  function updateAlertCount() {
    const countElement = document.getElementById("pm-alert-count");
    if (!countElement) return;
    const oldCount = parseInt(countElement.textContent) || 0;
    const newCount = activeAlerts.filter((a) => a.status === "Active" && !a.closed).length;
    countElement.textContent = newCount;
    if (oldCount !== newCount) {
      countElement.style.fontWeight = "bold";
      countElement.style.color = "#3b82f6";
      setTimeout(() => {
        countElement.style.fontWeight = "";
        countElement.style.color = "";
      }, 1e3);
    }
  }
})();
//# sourceMappingURL=content.js.map
