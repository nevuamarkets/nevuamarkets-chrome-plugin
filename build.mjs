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

const isProduction = process.env.NODE_ENV === 'production';
const isReview = process.env.NODE_ENV === 'review';

console.log(`🔨 Building in ${process.env.NODE_ENV || 'development'} mode...`);

await build({
  entryPoints: ['content.js', 'background.js', 'popup.js'],
  bundle: true,
  minify: isProduction, // Only minify for production
  sourcemap: !isProduction, // Include sourcemaps except for production
  outdir: 'dist',
  platform: 'browser',
  target: ['chrome110'],
  treeShaking: true,
  define: {
    'process.env.NODE_ENV': `"${process.env.NODE_ENV || 'development'}"`,
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