var process = { env: { LOG_LEVEL: "error" } };
(()=>{async function h(){if(alertBoxInjected||document.getElementById("pm-alert-box"))return;let e=document.querySelector("#trade-widget");if(e){let t=A();if(t){let n=await _(t);C(e,n)}else C(e,null);alertBoxInjected=!0;return}setTimeout(()=>{!alertBoxInjected&&!document.getElementById("pm-alert-box")&&h()},500)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{alertBoxInjected=!1,h(),k()}):(alertBoxInjected=!1,h(),k());var E=null;function k(){E&&clearInterval(E),E=setInterval(()=>{!alertBoxInjected&&!document.getElementById("pm-alert-box")&&h()},1e3)}window.addEventListener("popstate",()=>{alertBoxInjected=!1,k()});var I=location.href,x=A();setInterval(()=>{let e=location.href,t=A();e!==I&&(I=e,alertBoxInjected=!1,t!==x&&x&&(console.log(`Nevua: Slug changed from ${x} to ${t}, clearing old cache`),T.delete(x)),x=t,k())},1e3);document.addEventListener("visibilitychange",()=>{!document.hidden&&m&&setTimeout(()=>{m()},100)});var a=[],m=null,T=new Map,S=new Map,y=new Map,M=5e3,N=5*60*1e3;async function g(){let e=a.filter(t=>t.status==="Active"&&!t.closed).map(t=>t.clobtokenId);chrome.runtime.sendMessage({type:"update_subscriptions",needed:e},t=>{chrome.runtime.lastError&&console.error("Nevua: Failed to update subscriptions:",chrome.runtime.lastError)})}function w(){chrome.storage.local.set({polymarket_alerts:a},()=>{if(chrome.runtime.lastError){console.error("Nevua: Error saving alerts:",chrome.runtime.lastError);return}chrome.runtime.sendMessage({type:"alert_updated",alerts:a},e=>{chrome.runtime.lastError&&console.error("Nevua: Failed to broadcast alert update:",chrome.runtime.lastError)})})}function L(){return new Promise(e=>{chrome.storage.local.get(["polymarket_alerts"],t=>{if(chrome.runtime.lastError){console.error("Nevua: Error loading alerts:",chrome.runtime.lastError),e([]);return}let n=t.polymarket_alerts||[];n.forEach(r=>{r.status==="active"?r.status="Active":r.status==="paused"&&(r.status="Paused")}),e(n)})})}function q(e){chrome.storage.local.set({polymarket_widget_expanded:e},()=>{chrome.runtime.lastError&&console.error("Nevua: Error saving widget expand state:",chrome.runtime.lastError)})}function $(){return new Promise(e=>{chrome.storage.local.get(["polymarket_widget_expanded"],t=>{if(chrome.runtime.lastError){console.error("Nevua: Error loading widget expand state:",chrome.runtime.lastError),e(!0);return}let n=t.polymarket_widget_expanded!==!1;e(n)})})}chrome.runtime.onMessage.addListener((e,t,n)=>{if(e.type==="price_updates")return z(e.events),!1;if(e.type==="alert_update")return a=e.alerts,m&&m(),g(),!1});async function z(e){m&&setTimeout(()=>{L().then(t=>{a=t,m()})},100)}function A(){let e=window.location.pathname.match(/^\/event\/([^/]+)$/);return e?e[1]:null}async function _(e){let t=Date.now(),n=e,r=T.get(n);if(r&&t-r.timestamp<N)return console.log(`Nevua: Using cached market data for slug: ${e}`),r.data;let o=y.get(n);if(o)return console.log(`Nevua: Waiting for pending request for slug: ${e}`),await o;let i=S.get(n)||0;if(t-i<M)return console.log(`Nevua: Rate limited, using cached data for slug: ${e}`),r?r.data:null;console.log(`Nevua: Fetching fresh market data for slug: ${e}`);let s=P(e).then(l=>(S.set(n,t),l&&T.set(n,{data:l,timestamp:t}),y.delete(n),l)).catch(l=>{throw y.delete(n),l});return y.set(n,s),await s}async function P(e){try{let t=await fetch(`https://gamma-api.polymarket.com/events?slug=${e}`,{headers:{"User-Agent":"Nevua-Markets-Chrome-Extension/1.0"}});if(!t.ok)throw new Error(`API request failed: ${t.status}`);let n=await t.json();if(!n||!Array.isArray(n)||n.length===0)return console.error("Nevua: Invalid API response format"),null;let r=n[0],o={eventTitle:r.title,slug:r.slug,markets:[]};return r.markets&&Array.isArray(r.markets)&&r.markets.forEach(i=>{if(i.active===!0&&i.closed===!1)try{let s=JSON.parse(i.outcomes),l=JSON.parse(i.clobTokenIds);o.markets.push({conditionId:i.conditionId,question:i.question,outcomes:s,clobTokenIds:l})}catch(s){console.error("Nevua: Error parsing market data:",s)}}),o}catch(t){return console.error("Nevua: Error fetching market data:",t),null}}function j(e,t,n,r,o,i,s,l,u,c){return{id:crypto.randomUUID(),eventTitle:e,slug:t,conditionId:n,marketQuestion:r,outcomeIndex:o,outcomeName:i,clobtokenId:s,trigger:l==="once"?"One Time":"Recurring every 30 minutes",priceAlert:u.charAt(0).toUpperCase()+u.slice(1),targetPrice:c,lastTriggeredAtMS:0,triggerCount:0,status:"Active",closed:!1,outcome:null}}function C(e,t=null){if(document.getElementById("pm-alert-box")){console.log("Nevua: Alert box already exists, skipping injection");return}let n=t||{eventTitle:"",markets:[]},r=document.createElement("div");r.id="pm-alert-box",r.style.cssText=`
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
  `;let o=/^\/event\/[^/]+$/.test(window.location.pathname);r.innerHTML=`
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
        ${o?`
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
        `:`
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
          
          ${o?`
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
          `:""}
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
  `,e.appendChild(r),o&&F(r,n),H(r),m=f,L().then(i=>{a=i,f(),g();let s=a.filter(l=>l.status==="Active"&&!l.closed).length;chrome.runtime.sendMessage({type:"update_badge",count:s},l=>{chrome.runtime.lastError&&console.error("Nevua: Failed to update badge:",chrome.runtime.lastError)})})}function F(e,t){let n=e.querySelector("#pm-market-select"),r=e.querySelector("#pm-outcome-select"),o=e.querySelector("#pm-alert-set");t.markets&&t.markets.length>0?(n.innerHTML='<option value="" disabled selected>Select a market</option>',t.markets.forEach((i,s)=>{let l=document.createElement("option");l.value=s.toString(),l.textContent=i.question,l.title=i.question,n.appendChild(l)}),n.disabled=!1):(n.innerHTML='<option value="" disabled selected>No markets available</option>',n.disabled=!0),n.addEventListener("change",function(){if(this.value!==""&&t.markets){let i=parseInt(this.value),s=t.markets[i];s&&s.outcomes&&(r.disabled=!1,r.innerHTML="",s.outcomes.forEach((c,d)=>{let p=document.createElement("option");p.value=d.toString(),p.textContent=c,r.appendChild(p)}),s.outcomes.length>0&&(r.value="0"));let l=this.options[this.selectedIndex],u=l.title||l.textContent;u.length>50&&(l.textContent=u.substring(0,47)+"...")}else r.innerHTML='<option value="" disabled selected>None</option>',r.disabled=!0;v()}),r.addEventListener("change",v),e.querySelector("#pm-alert-price").addEventListener("input",function(){let i=this.value.replace(/[^0-9.]/g,""),s=i.split(".");s.length>2&&(i=s[0]+"."+s.slice(1).join(""));let l=parseFloat(i);!isNaN(l)&&l>100&&(i="100"),this.value=i,v()}),o.onclick=()=>{if(o.disabled)return;let i=parseInt(n.value),s=parseInt(r.value),l=t.markets[i],u=e.querySelector("#pm-alert-frequency").value,c=e.querySelector("#pm-alert-type").value,d=parseFloat(e.querySelector("#pm-alert-price").value);if(!isNaN(d)&&d>=0&&l){let p=j(t.eventTitle,t.slug,l.conditionId,l.question,s,l.outcomes[s],l.clobTokenIds[s],u,c,d);a.push(p),w(),f(),g(),n.selectedIndex=0,r.disabled=!0,r.innerHTML='<option value="" disabled selected>None</option>',e.querySelector("#pm-alert-price").value="",v()}}}function H(e){let t=e.querySelector("#pm-tab-create"),n=e.querySelector("#pm-tab-alerts"),r=e.querySelector("#pm-create-tab-content"),o=e.querySelector("#pm-alerts-tab-content"),i=e.querySelector("#pm-tab-chevron"),s=e.querySelector("#pm-chevron-icon"),l=!0;function u(){l?s.innerHTML='<path d="M16.293 9.293L12 13.586 7.707 9.293 6.293 10.707 12 16.414 17.707 10.707z"></path>':s.innerHTML='<path d="M7.707 14.707L12 10.414 16.293 14.707 17.707 13.293 12 7.586 6.293 13.293z"></path>'}function c(p){l=p,u(),l?(r.style.display=t.classList.contains("pm-tab-active")?"block":"none",o.style.display=n.classList.contains("pm-tab-active")?"block":"none"):(r.style.display="none",o.style.display="none"),q(l)}function d(p,b=!1){!l&&b&&c(!0),p==="create"?(t.classList.add("pm-tab-active"),n.classList.remove("pm-tab-active"),t.style.borderBottomColor="#3b82f6",t.style.color="#111827",t.style.fontWeight="600",n.style.borderBottomColor="transparent",n.style.color="#6b7280",n.style.fontWeight="500",l&&(r.style.display="block",o.style.display="none")):(n.classList.add("pm-tab-active"),t.classList.remove("pm-tab-active"),n.style.borderBottomColor="#3b82f6",n.style.color="#111827",n.style.fontWeight="600",t.style.borderBottomColor="transparent",t.style.color="#6b7280",t.style.fontWeight="500",l&&(o.style.display="block",r.style.display="none"),f())}t.addEventListener("click",()=>d("create",!0)),n.addEventListener("click",()=>d("alerts",!0)),i.addEventListener("click",()=>{c(!l)}),$().then(p=>{c(p)})}function v(){let e=document.getElementById("pm-alert-box");if(!e)return;let t=e.querySelector("#pm-market-select").value,n=e.querySelector("#pm-outcome-select").value,r=e.querySelector("#pm-alert-price").value,o=e.querySelector("#pm-alert-set"),i=t&&t!==""&&n&&n!==""&&r&&!isNaN(parseFloat(r));o.disabled=!i,i?(o.style.backgroundColor="#3b82f6",o.style.cursor="pointer",o.onmouseover=()=>o.style.backgroundColor="#2563eb",o.onmouseout=()=>o.style.backgroundColor="#3b82f6"):(o.style.backgroundColor="#9ca3af",o.style.cursor="not-allowed",o.onmouseover=null,o.onmouseout=null)}function f(){let e=document.getElementById("pm-alerts-list"),t=document.getElementById("pm-no-alerts"),n=document.getElementById("pm-alerts-summary");if(!e||!t)return;if(n){let o=a.filter(s=>s.status==="Active"&&!s.closed).length;if(a.length>0){n.innerHTML=`
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
            Active: ${o}
          </div>
        </div>
      `;let s=document.getElementById("pm-bulk-clear-btn"),l=document.getElementById("pm-bulk-clear-select");l.addEventListener("change",function(){this.value===""?(s.disabled=!0,s.style.background="#9ca3af",s.style.cursor="not-allowed"):(s.disabled=!1,s.style.background="#dc2626",s.style.cursor="pointer",s.onmouseover=()=>s.style.background="#b91c1c",s.onmouseout=()=>s.style.background="#dc2626")}),s.addEventListener("click",function(){if(this.disabled)return;let u=l.value,c=[];switch(u){case"closed":c=a.filter(d=>d.closed);break;case"paused":c=a.filter(d=>d.status==="Paused");break;case"all":c=[...a];break}c.length>0&&(c.forEach(d=>{let p=a.findIndex(b=>b.id===d.id);p!==-1&&a.splice(p,1)}),w(),f(),g()),l.value="",s.disabled=!0,s.style.background="#9ca3af",s.style.cursor="not-allowed"})}else n.textContent=`Active: ${o}`}let r=e.scrollTop;a.length===0?(t.style.display="block",e.querySelectorAll(".pm-alert-item").forEach(o=>o.remove())):(t.style.display="none",e.querySelectorAll(".pm-alert-item").forEach(o=>o.remove()),a.forEach(o=>{let i=document.createElement("div");i.className="pm-alert-item",i.style.cssText=`
        display: flex;
        align-items: flex-start;
        gap: 8px;
        padding: 12px;
        background: #f9fafb;
        border: 1px solid #e5e7eb;
        border-radius: 6px;
        font-size: 12px;
      `;let s=o.status==="Active"?"#10b981":"#6b7280",l=o.marketQuestion.length>30?o.marketQuestion.substring(0,27)+"...":o.marketQuestion,u=o.lastTriggeredAtMS>0?new Date(o.lastTriggeredAtMS).toLocaleString():"Never",c=o.eventTitle!==o.marketQuestion?`<div style="color: #6b7280; font-size: 11px; margin-bottom: 2px;" title="${o.eventTitle}">Event: ${o.eventTitle.length>30?o.eventTitle.substring(0,27)+"...":o.eventTitle}</div>`:"",d=o.closed,p=d?"disabled":"",b=d?"opacity: 0.5; cursor: not-allowed;":"cursor: pointer;",B=d?"Market is closed":o.status==="Active"?"Pause this alert":"Resume this alert";i.innerHTML=`
        <div style="
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: ${s};
          flex-shrink: 0;
          margin-top: 4px;
        "></div>
        <div style="flex: 1; overflow: hidden; line-height: 1.4;">
          <!-- Title row with buttons -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
            <div style="font-weight: 500; color: #374151; flex: 1; overflow: hidden;" title="${o.marketQuestion}">
              <a href="https://polymarket.com/event/${o.slug}" target="_blank" style="color: #3b82f6; text-decoration: none;">${l}</a>
            </div>
            <div style="display: flex; gap: 4px; flex-shrink: 0; margin-left: 8px;">
              <button class="pm-toggle-alert" data-id="${o.id}" ${p} style="
                background: transparent;
                color: #374151;
                border: 1px solid #d1d5db;
                border-radius: 4px;
                padding: 4px 6px;
                font-size: 12px;
                flex-shrink: 0;
                min-width: 28px;
                ${b}
              " title="${B}">${o.status==="Active"?"\u23F8\uFE0F":"\u25B6\uFE0F"}</button>
              <button class="pm-delete-alert" data-id="${o.id}" style="
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
          ${c}
          
          ${d?`
            <!-- Market closed status -->
            <div style="color: #dc2626; font-size: 11px; margin-bottom: 2px; font-weight: 600;" title="This market has been resolved">
              Market closed: Outcome > ${o.outcome}
            </div>
          `:`
            <!-- Outcome and Price row -->
            <div style="color: #6b7280; font-size: 11px; margin-bottom: 2px;" title="The outcome you're betting on and price threshold">
              <span>Outcome: ${o.outcomeName}</span>
              <span style="margin-left: 8px;">Price ${o.priceAlert.toLowerCase()} ${o.targetPrice}\xA2</span>
            </div>
            
            <!-- Trigger row -->
            <div style="color: #6b7280; font-size: 11px; margin-bottom: 2px;" title="How often this alert will trigger">
              <span>Trigger: ${o.trigger}</span>
            </div>
          `}
          
          <!-- Last triggered row -->
          <div style="color: #6b7280; font-size: 11px;" title="When this alert was last triggered">
            <span>Last triggered: ${u} (${o.triggerCount} times)</span>
          </div>
        </div>
      `,e.appendChild(i)}),e.querySelectorAll(".pm-toggle-alert").forEach(o=>{o.addEventListener("click",function(){let i=this.dataset.id;R(i)})}),e.querySelectorAll(".pm-delete-alert").forEach(o=>{o.addEventListener("click",function(){let i=this.dataset.id;O(i)})}),setTimeout(()=>{e.scrollTop=r},0)),U()}function R(e){let t=a.find(n=>n.id===e);t&&!t.closed&&(t.status=t.status==="Active"?"Paused":"Active",w(),f(),g())}function O(e){let t=a.findIndex(n=>n.id===e);t!==-1&&(a.splice(t,1),w(),f(),g())}function U(){let e=document.getElementById("pm-alert-count");if(!e)return;let t=parseInt(e.textContent)||0,n=a.filter(r=>r.status==="Active"&&!r.closed).length;e.textContent=n,t!==n&&(e.style.fontWeight="bold",e.style.color="#3b82f6",setTimeout(()=>{e.style.fontWeight="",e.style.color=""},1e3))}})();
