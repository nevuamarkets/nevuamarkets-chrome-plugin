/* Browser stub for the 'ws' module used in Node.js builds.
   Provides minimal wrapper around native WebSocket to satisfy
   the subset of api calls used by poly-websockets (on, send, ping, close, removeAllListeners).
*/

class WSWrapper {
  constructor(url) {
    // Use the global WebSocket object (works in both content scripts and service workers)
    this._ws = new WebSocket(url);
    this._listeners = new Map(); // event -> Set<handler>
  }

  /**
   * Node-style event emitter interface .on(event, handler)
   * Maps to browser WebSocket addEventListener.
   */
  on(event, handler) {
    if (!this._listeners.has(event)) this._listeners.set(event, new Set());
    this._listeners.get(event).add(handler);
    if (event === 'message') {
      const wrapped = (e) => {
        const raw = e && 'data' in e ? e.data : '';
        const dataWrapper = {
          toString: () => {
            if (typeof raw === 'string') return raw;
            if (raw instanceof ArrayBuffer) return new TextDecoder().decode(new Uint8Array(raw));
            if (raw && raw.buffer) return new TextDecoder().decode(raw);
            return '';
          }
        };
        handler(dataWrapper);
      };
      this._listeners.get(event).add(wrapped);
      this._ws.addEventListener('message', wrapped);
      return;
    }
    this._ws.addEventListener(event, handler);
  }

  /** remove all registered listeners (used before re-attaching) */
  removeAllListeners() {
    for (const [event, handlers] of this._listeners.entries()) {
      for (const h of handlers) {
        this._ws.removeEventListener(event, h);
      }
    }
    this._listeners.clear();
  }

  send(data) {
    this._ws.readyState === 1 /* OPEN */ ? this._ws.send(data) : null;
  }

  /** ping is a noop in browser (no TCP ping) */
  ping() {}

  close(code, reason) {
    this._ws.close(code, reason);
  }
}

export default WSWrapper; 