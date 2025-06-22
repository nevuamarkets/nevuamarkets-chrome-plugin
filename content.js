const waitForTradeBox = () => {
    const container = document.querySelector("#trade-widget");
    if (container && !document.getElementById("pm-alert-box")) {
      injectAlertBox(container);
    } else {
      setTimeout(waitForTradeBox, 1000);
    }
  };
  
  function injectAlertBox(container) {
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
    `;
    
    box.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <strong style="font-size: 16px; font-weight: 600; color: #111827;">Price Alert</strong>
            <select id="pm-alert-type" style="
              background: #f9fafb;
              border: 1px solid #d1d5db;
              border-radius: 8px;
              padding: 6px 10px;
              font-size: 14px;
              color: #374151;
              cursor: pointer;
            ">
              <option value="over">Over</option>
              <option value="under">Under</option>
            </select>
          </div>
          <input id="pm-alert-price" type="number" min="0" max="100" step="1" placeholder="Target ¢" style="
            width: 80px;
            background: #f9fafb;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            padding: 6px 10px;
            font-size: 14px;
            color: #374151;
            text-align: right;
          ">
        </div>
        <div style="display: flex; justify-content: flex-end;">
          <button id="pm-alert-set" style="
            background: #3b82f6;
            color: white;
            border: none;
            border-radius: 8px;
            padding: 8px 16px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.2s;
          " onmouseover="this.style.backgroundColor='#2563eb'" onmouseout="this.style.backgroundColor='#3b82f6'">
            Create Alert
          </button>
        </div>
      </div>
    `;
  
    container.appendChild(box);
  
    document.getElementById("pm-alert-set").onclick = () => {
      const type = document.getElementById("pm-alert-type").value;
      const target = parseInt(document.getElementById("pm-alert-price").value, 10);
      if (!isNaN(target)) {
        monitorPrice(type, target);
        alert(`Alert set: ${type} ${target}¢`);
      }
    };
  }
  
  function monitorPrice(type, target) {
    const interval = setInterval(() => {
      const yesPriceEl = document.querySelector("#outcome-buttons [aria-checked='true'] p:nth-of-type(2) span");
      if (yesPriceEl) {
        const priceText = yesPriceEl.textContent.replace("¢", "");
        const price = parseInt(priceText, 10);
        if ((type === "over" && price >= target) || (type === "under" && price <= target)) {
          chrome.runtime.sendMessage({
            type: "notify",
            message: `YES price is now ${price}¢`
          });
          clearInterval(interval);
        }
      }
    }, 2000);
  }
  
  waitForTradeBox();