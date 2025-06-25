import { build } from 'esbuild';
import { copyFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';

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
  sourcemap: process.env.NODE_ENV !== 'production', // Only include sourcemaps in dev
  outdir: 'dist',
  platform: 'browser',
  target: ['chrome110'],
  treeShaking: true,
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

// Copy icon to dist folder
try {
  mkdirSync('dist', { recursive: true });
  copyFileSync('icon128.png', 'dist/icon128.png');
  console.log('✅ Icon copied to dist/icon128.png');
} catch (err) {
  console.error('❌ Failed to copy icon:', err.message);
} 