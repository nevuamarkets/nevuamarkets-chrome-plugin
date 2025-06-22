import { build } from 'esbuild';

// Custom plugin to stub out Node.js modules with browser-compatible versions
function stubPlugin(moduleName) {
  return {
    name: `stub-${moduleName}`,
    setup(build) {
      build.onResolve({ filter: new RegExp(`^${moduleName}$`) }, args => ({
        path: new URL(`./shims/${moduleName}.js`, import.meta.url).pathname
      }));
    }
  };
}

await build({
  entryPoints: ['content.js', 'background.js', 'popup.js'],
  bundle: true,
  minify: true,
  sourcemap: false,
  outdir: 'dist',
  platform: 'browser',
  target: ['chrome110'],
  define: {
    'process.env.NODE_ENV': '"production"',
    global: 'globalThis', // Use globalThis instead of window for service worker compatibility
    "process.env.LOG_LEVEL": '"warn"',
  },
  plugins: [stubPlugin('ws'), stubPlugin('winston'), stubPlugin('crypto')],
  banner: {
    js: 'var process = { env: { LOG_LEVEL: "warn" } };'
  }
}); 