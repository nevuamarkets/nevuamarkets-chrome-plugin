var process = { env: { LOG_LEVEL: "warn" } };
(() => {
  // popup.js
  var activeAlerts = [];
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
      ensureSubscriptions();
    });
  }
  async function ensureSubscriptions() {
    const needed = activeAlerts.filter((a) => a.status === "Active" && !a.closed).map((a) => a.clobtokenId);
    chrome.runtime.sendMessage({
      type: "update_subscriptions",
      needed
    }, (response) => {
      if (chrome.runtime.lastError) {
        console.error("Nevua: Failed to update subscriptions:", chrome.runtime.lastError);
      }
    });
  }
  function toggleAlert(alertId) {
    const alert = activeAlerts.find((a) => a.id === alertId);
    if (alert && !alert.closed) {
      alert.status = alert.status === "Active" ? "Paused" : "Active";
      saveAlertsToStorage();
      renderAlertsList();
    }
  }
  function deleteAlert(alertId) {
    const alertIndex = activeAlerts.findIndex((a) => a.id === alertId);
    if (alertIndex !== -1) {
      activeAlerts.splice(alertIndex, 1);
      saveAlertsToStorage();
      renderAlertsList();
    }
  }
  function performBulkClear(clearType) {
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
    }
  }
  function setupBulkClearControls() {
    const bulkClearBtn = document.getElementById("bulkClearBtn");
    const bulkClearSelect = document.getElementById("bulkClearSelect");
    if (!bulkClearBtn || !bulkClearSelect) return;
    bulkClearBtn.removeEventListener("click", handleBulkClearClick);
    bulkClearSelect.removeEventListener("change", handleBulkClearSelectChange);
    bulkClearSelect.addEventListener("change", handleBulkClearSelectChange);
    bulkClearBtn.addEventListener("click", handleBulkClearClick);
  }
  function handleBulkClearSelectChange() {
    const bulkClearBtn = document.getElementById("bulkClearBtn");
    if (this.value === "") {
      bulkClearBtn.disabled = true;
      bulkClearBtn.style.background = "#9ca3af";
      bulkClearBtn.style.cursor = "not-allowed";
    } else {
      bulkClearBtn.disabled = false;
      bulkClearBtn.style.background = "#dc2626";
      bulkClearBtn.style.cursor = "pointer";
    }
  }
  function handleBulkClearClick() {
    const bulkClearSelect = document.getElementById("bulkClearSelect");
    if (this.disabled) return;
    const clearType = bulkClearSelect.value;
    performBulkClear(clearType);
    bulkClearSelect.value = "";
    this.disabled = true;
    this.style.background = "#9ca3af";
    this.style.cursor = "not-allowed";
  }
  function updateAlertCount() {
    const countElement = document.getElementById("alertCount");
    if (!countElement) return;
    const activeCount = activeAlerts.filter((a) => a.status === "Active" && !a.closed).length;
    countElement.textContent = activeCount;
    chrome.runtime.sendMessage({
      type: "update_badge",
      count: activeCount
    });
  }
  function renderAlertsList() {
    const alertsContainer = document.getElementById("alertsContainer");
    const loading = document.getElementById("loading");
    const noAlerts = document.getElementById("noAlerts");
    const bulkClearControls = document.getElementById("bulkClearControls");
    if (!alertsContainer) return;
    loading.style.display = "none";
    if (bulkClearControls) {
      if (activeAlerts.length > 0) {
        bulkClearControls.style.display = "flex";
        setupBulkClearControls();
      } else {
        bulkClearControls.style.display = "none";
      }
    }
    alertsContainer.querySelectorAll(".alert-item").forEach((item) => item.remove());
    if (activeAlerts.length === 0) {
      noAlerts.style.display = "block";
    } else {
      noAlerts.style.display = "none";
      activeAlerts.forEach((alert) => {
        const alertItem = document.createElement("div");
        alertItem.className = "alert-item";
        const truncatedTitle = alert.marketQuestion.length > 35 ? alert.marketQuestion.substring(0, 32) + "..." : alert.marketQuestion;
        const lastTriggeredDate = alert.lastTriggeredAtMS > 0 ? new Date(alert.lastTriggeredAtMS).toLocaleString() : "Never";
        const eventLine = alert.eventTitle !== alert.marketQuestion ? `<div class="alert-details" title="${alert.eventTitle}">Event: ${alert.eventTitle.length > 35 ? alert.eventTitle.substring(0, 32) + "..." : alert.eventTitle}</div>` : "";
        const isMarketClosed = alert.closed;
        const toggleButtonDisabled = isMarketClosed ? "disabled" : "";
        const toggleButtonStyle = isMarketClosed ? "opacity: 0.5; pointer-events: none;" : "";
        const toggleButtonTitle = isMarketClosed ? "Market is closed" : alert.status === "Active" ? "Pause this alert" : "Resume this alert";
        alertItem.innerHTML = `
        <div class="status-dot ${alert.status.toLowerCase()}"></div>
        <div class="alert-content">
          <!-- Title row with buttons -->
          <div class="alert-title">
            <div class="alert-title-text" title="${alert.marketQuestion}">
              <a href="https://polymarket.com/event/${alert.slug}" target="_blank">${truncatedTitle}</a>
            </div>
            <div class="alert-actions">
              <button class="action-btn toggle-alert" data-id="${alert.id}" ${toggleButtonDisabled} style="${toggleButtonStyle}" title="${toggleButtonTitle}">${alert.status === "Active" ? "\u23F8\uFE0F" : "\u25B6\uFE0F"}</button>
              <button class="action-btn delete-alert" data-id="${alert.id}" title="Delete this alert permanently">\u{1F5D1}\uFE0F</button>
            </div>
          </div>
          
          <!-- Event line (if different) -->
          ${eventLine}
          
          ${isMarketClosed ? `
            <!-- Market closed status -->
            <div class="alert-details" style="color: #dc2626; font-weight: 600;" title="This market has been resolved">
              Market closed: Outcome > ${alert.outcome}
            </div>
          ` : `
            <!-- Outcome and Price row -->
            <div class="alert-details" title="The outcome you're betting on and price threshold">
              <span>Outcome: ${alert.outcomeName}</span>
              <span style="margin-left: 8px;">Price ${alert.priceAlert.toLowerCase()} ${alert.targetPrice}\xA2</span>
            </div>
            
            <!-- Trigger row -->
            <div class="alert-details" title="How often this alert will trigger">
              <span>Trigger: ${alert.trigger}</span>
            </div>
          `}
          
          <!-- Last triggered row -->
          <div class="alert-details" title="When this alert was last triggered">
            <span>Last triggered: ${lastTriggeredDate} (${alert.triggerCount} times)</span>
          </div>
        </div>
      `;
        alertsContainer.appendChild(alertItem);
      });
      alertsContainer.querySelectorAll(".toggle-alert").forEach((button) => {
        button.addEventListener("click", function() {
          const alertId = this.dataset.id;
          toggleAlert(alertId);
        });
      });
      alertsContainer.querySelectorAll(".delete-alert").forEach((button) => {
        button.addEventListener("click", function() {
          const alertId = this.dataset.id;
          deleteAlert(alertId);
        });
      });
    }
    updateAlertCount();
  }
  document.addEventListener("DOMContentLoaded", async () => {
    activeAlerts = await loadAlertsFromStorage();
    renderAlertsList();
    chrome.storage.onChanged.addListener((changes, namespace) => {
      if (namespace === "local" && changes.polymarket_alerts) {
        activeAlerts = changes.polymarket_alerts.newValue || [];
        renderAlertsList();
      }
    });
  });
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "alert_update") {
      activeAlerts = message.alerts;
      renderAlertsList();
      return false;
    }
  });
})();
//# sourceMappingURL=popup.js.map
