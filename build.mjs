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

// Copy static assets to dist folder
try {
  mkdirSync('dist', { recursive: true });
  const staticFiles = [
    ['icon128.png', 'dist/icon128.png'],
    ['package.json', 'dist/package.json'],
    ['README.md', 'dist/README.md'],
    ['TERMS_OF_USE.txt', 'dist/TERMS_OF_USE.txt']
  ];
  for (const [src, dest] of staticFiles) {
    copyFileSync(src, dest);
  }
  console.log('✅ Static assets copied to dist');
} catch (err) {
  console.error('❌ Failed to copy static assets:', err.message);
} 