var process = { env: { LOG_LEVEL: "error" } };
(()=>{var n=[];function y(){return new Promise(e=>{chrome.storage.local.get(["polymarket_alerts"],t=>{if(chrome.runtime.lastError){console.error("Nevua: Error loading alerts:",chrome.runtime.lastError),e([]);return}let r=t.polymarket_alerts||[];r.forEach(l=>{l.status==="active"?l.status="Active":l.status==="paused"&&(l.status="Paused")}),e(r)})})}function c(){chrome.storage.local.set({polymarket_alerts:n},()=>{if(chrome.runtime.lastError){console.error("Nevua: Error saving alerts:",chrome.runtime.lastError);return}chrome.runtime.sendMessage({type:"alert_updated",alerts:n},e=>{chrome.runtime.lastError&&console.error("Nevua: Failed to broadcast alert update:",chrome.runtime.lastError)}),k()})}async function k(){let e=n.filter(t=>t.status==="Active"&&!t.closed).map(t=>t.clobtokenId);chrome.runtime.sendMessage({type:"update_subscriptions",needed:e},t=>{chrome.runtime.lastError&&console.error("Nevua: Failed to update subscriptions:",chrome.runtime.lastError)})}function b(e){let t=n.find(r=>r.id===e);t&&!t.closed&&(t.status=t.status==="Active"?"Paused":"Active",c(),a())}function E(e){let t=n.findIndex(r=>r.id===e);t!==-1&&(n.splice(t,1),c(),a())}function C(e){let t=[];switch(e){case"closed":t=n.filter(r=>r.closed);break;case"paused":t=n.filter(r=>r.status==="Paused");break;case"all":t=[...n];break}t.length>0&&(t.forEach(r=>{let l=n.findIndex(s=>s.id===r.id);l!==-1&&n.splice(l,1)}),c(),a())}function A(){let e=document.getElementById("bulkClearBtn"),t=document.getElementById("bulkClearSelect");!e||!t||(e.removeEventListener("click",u),t.removeEventListener("change",d),t.addEventListener("change",d),e.addEventListener("click",u))}function d(){let e=document.getElementById("bulkClearBtn");this.value===""?(e.disabled=!0,e.style.background="#9ca3af",e.style.cursor="not-allowed"):(e.disabled=!1,e.style.background="#dc2626",e.style.cursor="pointer")}function u(){let e=document.getElementById("bulkClearSelect");if(this.disabled)return;let t=e.value;C(t),e.value="",this.disabled=!0,this.style.background="#9ca3af",this.style.cursor="not-allowed"}function $(){let e=document.getElementById("alertCount");if(!e)return;let t=n.filter(r=>r.status==="Active"&&!r.closed).length;e.textContent=t,chrome.runtime.sendMessage({type:"update_badge",count:t})}function a(){let e=document.getElementById("alertsContainer"),t=document.getElementById("loading"),r=document.getElementById("noAlerts"),l=document.getElementById("bulkClearControls");e&&(t.style.display="none",l&&(n.length>0?(l.style.display="flex",A()):l.style.display="none"),e.querySelectorAll(".alert-item").forEach(s=>s.remove()),n.length===0?r.style.display="block":(r.style.display="none",n.forEach(s=>{let o=document.createElement("div");o.className="alert-item";let m=s.marketQuestion.length>35?s.marketQuestion.substring(0,32)+"...":s.marketQuestion,g=s.lastTriggeredAtMS>0?new Date(s.lastTriggeredAtMS).toLocaleString():"Never",v=s.eventTitle!==s.marketQuestion?`<div class="alert-details" title="${s.eventTitle}">Event: ${s.eventTitle.length>35?s.eventTitle.substring(0,32)+"...":s.eventTitle}</div>`:"",i=s.closed,f=i?"disabled":"",h=i?"opacity: 0.5; pointer-events: none;":"",p=i?"Market is closed":s.status==="Active"?"Pause this alert":"Resume this alert";o.innerHTML=`
        <div class="status-dot ${s.status.toLowerCase()}"></div>
        <div class="alert-content">
          <!-- Title row with buttons -->
          <div class="alert-title">
            <div class="alert-title-text" title="${s.marketQuestion}">
              <a href="https://polymarket.com/event/${s.slug}" target="_blank">${m}</a>
            </div>
            <div class="alert-actions">
              <button class="action-btn toggle-alert" data-id="${s.id}" ${f} style="${h}" title="${p}">${s.status==="Active"?"\u23F8\uFE0F":"\u25B6\uFE0F"}</button>
              <button class="action-btn delete-alert" data-id="${s.id}" title="Delete this alert permanently">\u{1F5D1}\uFE0F</button>
            </div>
          </div>
          
          <!-- Event line (if different) -->
          ${v}
          
          ${i?`
            <!-- Market closed status -->
            <div class="alert-details" style="color: #dc2626; font-weight: 600;" title="This market has been resolved">
              Market closed: Outcome > ${s.outcome}
            </div>
          `:`
            <!-- Outcome and Price row -->
            <div class="alert-details" title="The outcome you're betting on and price threshold">
              <span>Outcome: ${s.outcomeName}</span>
              <span style="margin-left: 8px;">Price ${s.priceAlert.toLowerCase()} ${s.targetPrice}\xA2</span>
            </div>
            
            <!-- Trigger row -->
            <div class="alert-details" title="How often this alert will trigger">
              <span>Trigger: ${s.trigger}</span>
            </div>
          `}
          
          <!-- Last triggered row -->
          <div class="alert-details" title="When this alert was last triggered">
            <span>Last triggered: ${g} (${s.triggerCount} times)</span>
          </div>
        </div>
      `,e.appendChild(o)}),e.querySelectorAll(".toggle-alert").forEach(s=>{s.addEventListener("click",function(){let o=this.dataset.id;b(o)})}),e.querySelectorAll(".delete-alert").forEach(s=>{s.addEventListener("click",function(){let o=this.dataset.id;E(o)})})),$())}document.addEventListener("DOMContentLoaded",async()=>{n=await y(),a(),chrome.storage.onChanged.addListener((e,t)=>{t==="local"&&e.polymarket_alerts&&(n=e.polymarket_alerts.newValue||[],a())})});chrome.runtime.onMessage.addListener((e,t,r)=>{if(e.type==="alert_update")return n=e.alerts,a(),!1});})();
