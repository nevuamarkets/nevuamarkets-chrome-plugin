/* Browser stub for 'winston' logger. Replaces logger methods with no-ops */
const noop = () => {};

// Basic mock transport class
class ConsoleTransport {
  constructor() {}
  log() {}
}

export const transports = { Console: ConsoleTransport };

// Very light-weight mock of winston.format helpers
const passthrough = () => ({ transform: (info) => info });

const dynamicFormat = new Proxy({}, {
  get: (_target, prop) => {
    if (prop === 'combine') {
      return (...fns) => ({ transform: (info) => fns.reduce((acc, fn) => (fn.transform ? fn.transform(acc) : acc), info) });
    }
    // any formatter like timestamp, json, errors, colorize, printf etc.
    return (...args) => passthrough(...args);
  },
});

export const format = dynamicFormat;

export const createLogger = () => ({
  info: console.log.bind(console), //noop later
  warn: console.log.bind(console),
  error: console.error.bind(console),
  debug: console.log.bind(console),
});

export default { createLogger, format, transports }; 