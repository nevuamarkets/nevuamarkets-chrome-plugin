  // === background.js ===
  chrome.runtime.onInstalled.addListener(() => {
    console.log("Polymarket Alert extension installed.");
  });
  
  // === In background.js (add this listener to support notifications) ===
  chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    if (req.type === "notify") {
      chrome.notifications.create({
        type: "basic",
        //iconUrl: "icon128.png", // optional icon
        title: "Polymarket Price Alert",
        message: req.message
      });
    }
  });
  