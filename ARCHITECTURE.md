┌─────────────────────────────────────────────────────────────┐
│                    Chrome Storage (Shared)                  │
│                    • All alerts                             │
│                    • User preferences                       │
└─────────────────────────────────────────────────────────────┘
                                 ↕ sync via chrome.storage API
┌─────────────────────────────────────────────────────────────┐
│                  Background Script (Shared)                 │
│                  • WebSocket connections                     │
│                  • Price monitoring                         │
│                  • Cross-tab messaging                      │
└─────────────────────────────────────────────────────────────┘
                                 ↕ broadcasts updates
┌──────────────────┐             ↕                ┌──────────────────┐
│    Window 1      │                              │    Window 2      │
│ ┌──────────────┐ │                              │ ┌──────────────┐ │
│ │ Content.js   │ │                              │ │ Content.js   │ │
│ │ • Local cache│ │ ←─────── messages ──────→    │ │ • Local cache│ │
│ │ • UI state   │ │                              │ │ • UI state   │ │
│ └──────────────┘ │                              │ └──────────────┘ │
└──────────────────┘                              └──────────────────┘