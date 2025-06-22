// Global state for managing alerts in popup
let activeAlerts = [];

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

    // Update subscriptions
    ensureSubscriptions();
  });
}

/**
 * Ensures websocket subscriptions match the set of currently ACTIVE and OPEN alerts
 * by sending subscription updates to background script.
 */
async function ensureSubscriptions() {
  const needed = activeAlerts
    .filter(a => a.status === 'Active' && !a.closed)
    .map(a => a.clobtokenId);

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
 * Toggles an alert's active state
 * @param {string} alertId - The ID of the alert to toggle
 */
function toggleAlert(alertId) {
  const alert = activeAlerts.find(a => a.id === alertId);
  if (alert && !alert.closed) { // Don't allow toggling closed markets
    alert.status = alert.status === 'Active' ? 'Paused' : 'Active';
    saveAlertsToStorage();
    renderAlertsList();
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
    saveAlertsToStorage();
    renderAlertsList();
  }
}

/**
 * Performs bulk clear operation based on selected type
 * @param {string} clearType - Type of alerts to clear ('closed', 'inactive', 'all')
 */
function performBulkClear(clearType) {
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
    
    // Save and refresh
    saveAlertsToStorage();
    renderAlertsList();
  }
}

/**
 * Sets up bulk clear controls event listeners
 */
function setupBulkClearControls() {
  const bulkClearBtn = document.getElementById('bulkClearBtn');
  const bulkClearSelect = document.getElementById('bulkClearSelect');
  
  if (!bulkClearBtn || !bulkClearSelect) return;
  
  // Remove existing listeners to prevent duplicates
  bulkClearBtn.removeEventListener('click', handleBulkClearClick);
  bulkClearSelect.removeEventListener('change', handleBulkClearSelectChange);
  
  // Add event listeners
  bulkClearSelect.addEventListener('change', handleBulkClearSelectChange);
  bulkClearBtn.addEventListener('click', handleBulkClearClick);
}

/**
 * Handles bulk clear select dropdown change
 */
function handleBulkClearSelectChange() {
  const bulkClearBtn = document.getElementById('bulkClearBtn');
  
  if (this.value === '') {
    bulkClearBtn.disabled = true;
    bulkClearBtn.style.background = '#9ca3af';
    bulkClearBtn.style.cursor = 'not-allowed';
  } else {
    bulkClearBtn.disabled = false;
    bulkClearBtn.style.background = '#dc2626';
    bulkClearBtn.style.cursor = 'pointer';
  }
}

/**
 * Handles bulk clear button click
 */
function handleBulkClearClick() {
  const bulkClearSelect = document.getElementById('bulkClearSelect');
  
  if (this.disabled) return;
  
  const clearType = bulkClearSelect.value;
  performBulkClear(clearType);
  
  // Reset selection
  bulkClearSelect.value = '';
  this.disabled = true;
  this.style.background = '#9ca3af';
  this.style.cursor = 'not-allowed';
}

/**
 * Updates the alert count in the header (shows only active, non-closed alerts)
 */
function updateAlertCount() {
  const countElement = document.getElementById('alertCount');
  if (!countElement) return;
  
  const activeCount = activeAlerts.filter(a => a.status === 'Active' && !a.closed).length;
  countElement.textContent = activeCount;
  
  // Update background to sync badge
  chrome.runtime.sendMessage({
    type: "update_badge",
    count: activeCount
  });
}

/**
 * Renders the active alerts list
 */
function renderAlertsList() {
  const alertsContainer = document.getElementById('alertsContainer');
  const loading = document.getElementById('loading');
  const noAlerts = document.getElementById('noAlerts');
  const bulkClearControls = document.getElementById('bulkClearControls');
  
  if (!alertsContainer) return;
  
  // Hide loading
  loading.style.display = 'none';
  
  // Show/hide bulk clear controls based on whether there are alerts
  if (bulkClearControls) {
    if (activeAlerts.length > 0) {
      bulkClearControls.style.display = 'flex';
      setupBulkClearControls();
    } else {
      bulkClearControls.style.display = 'none';
    }
  }
  
  // Clear existing alert items
  alertsContainer.querySelectorAll('.alert-item').forEach(item => item.remove());
  
  if (activeAlerts.length === 0) {
    noAlerts.style.display = 'block';
  } else {
    noAlerts.style.display = 'none';
    
    // Add alert items
    activeAlerts.forEach(alert => {
      const alertItem = document.createElement('div');
      alertItem.className = 'alert-item';
      
      const truncatedTitle = alert.marketQuestion.length > 35 ? 
        alert.marketQuestion.substring(0, 32) + '...' : alert.marketQuestion;
      
      // Format last triggered date
      const lastTriggeredDate = alert.lastTriggeredAtMS > 0 ? 
        new Date(alert.lastTriggeredAtMS).toLocaleString() : 'Never';
      
      // Show event title if different from market question (also truncated)
      const eventLine = alert.eventTitle !== alert.marketQuestion ? 
        `<div class="alert-details" title="${alert.eventTitle}">Event: ${alert.eventTitle.length > 35 ? alert.eventTitle.substring(0, 32) + '...' : alert.eventTitle}</div>` : '';
      
      // Check if market is closed and show appropriate status
      const isMarketClosed = alert.closed;
      const toggleButtonDisabled = isMarketClosed ? 'disabled' : '';
      const toggleButtonStyle = isMarketClosed ? 'opacity: 0.5; pointer-events: none;' : '';
      const toggleButtonTitle = isMarketClosed ? 'Market is closed' : (alert.status === 'Active' ? 'Pause this alert' : 'Resume this alert');
      
      alertItem.innerHTML = `
        <div class="status-dot ${alert.status.toLowerCase()}"></div>
        <div class="alert-content">
          <!-- Title row with buttons -->
          <div class="alert-title">
            <div class="alert-title-text" title="${alert.marketQuestion}">
              <a href="https://polymarket.com/event/${alert.slug}" target="_blank">${truncatedTitle}</a>
            </div>
            <div class="alert-actions">
              <button class="action-btn toggle-alert" data-id="${alert.id}" ${toggleButtonDisabled} style="${toggleButtonStyle}" title="${toggleButtonTitle}">${alert.status === 'Active' ? '⏸️' : '▶️'}</button>
              <button class="action-btn delete-alert" data-id="${alert.id}" title="Delete this alert permanently">🗑️</button>
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
              <span style="margin-left: 8px;">Price ${alert.priceAlert.toLowerCase()} ${alert.targetPrice}¢</span>
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
    
    // Add event listeners for toggle and delete buttons
    alertsContainer.querySelectorAll('.toggle-alert').forEach(button => {
      button.addEventListener('click', function() {
        const alertId = this.dataset.id;
        toggleAlert(alertId);
      });
    });
    
    alertsContainer.querySelectorAll('.delete-alert').forEach(button => {
      button.addEventListener('click', function() {
        const alertId = this.dataset.id;
        deleteAlert(alertId);
      });
    });
  }
  
  updateAlertCount();
}

/**
 * Initialize the popup when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', async () => {
  // Load alerts from storage
  activeAlerts = await loadAlertsFromStorage();
  
  // Render the alerts list
  renderAlertsList();
  
  // Listen for storage changes (from other tabs)
  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'local' && changes.polymarket_alerts) {
      activeAlerts = changes.polymarket_alerts.newValue || [];
      renderAlertsList();
    }
  });
});

/**
 * Listen for messages from background script or content scripts
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Handle alert updates from other tabs
  if (message.type === "alert_update") {
    activeAlerts = message.alerts;
    renderAlertsList();
    return false;
  }
}); 