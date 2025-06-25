import { build } from 'esbuild';
import { copyFileSync, mkdirSync, rmSync, existsSync, readFileSync } from 'fs';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { dirname, join } from 'path';
import archiver from 'archiver';

// Read package.json to get version
const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
const version = packageJson.version;
const packageType = process.env.PACKAGE_TYPE || 'production';

// Clean dist directory
if (existsSync('dist')) {
  rmSync('dist', { recursive: true, force: true });
}

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

console.log(`🔨 Building extension for ${packageType}...`);

const isReviewBuild = packageType === 'review';

// Build with optimizations based on package type
await build({
  entryPoints: ['content.js', 'background.js', 'popup.js'],
  bundle: true,
  minify: !isReviewBuild, // Don't minify for review builds
  sourcemap: isReviewBuild, // Include sourcemaps for review builds
  outdir: 'dist',
  platform: 'browser',
  target: ['chrome110'],
  treeShaking: true, // Enable tree shaking
  define: {
    'process.env.NODE_ENV': isReviewBuild ? '"review"' : '"production"',
    global: 'globalThis',
    "process.env.LOG_LEVEL": '"error"',
  },
  plugins: [stubPlugin('ws'), stubPlugin('winston'), stubPlugin('crypto')],
  banner: {
    js: 'var process = { env: { LOG_LEVEL: "error" } };'
  }
}); 

// Copy required files to dist
try {
  mkdirSync('dist', { recursive: true });
  
  // Copy icon
  copyFileSync('icon128.png', 'dist/icon128.png');
  console.log('✅ Icon copied to dist/');
  
  // Copy popup.html
  copyFileSync('popup.html', 'dist/popup.html');
  console.log('✅ Popup HTML copied to dist/');
  
  // Copy manifest.json to dist
  copyFileSync('manifest.json', 'dist/manifest.json');
  console.log('✅ Manifest copied to dist/');
  
} catch (err) {
  console.error('❌ Failed to copy files:', err.message);
  process.exit(1);
}

// Create ZIP package
console.log('📦 Creating ZIP package...');

const zipFilename = `nevuamarkets-chrome-extension-${version}${isReviewBuild ? '-review' : ''}.zip`;

async function createZip() {
  const output = createWriteStream(zipFilename);
  const archive = archiver('zip', { zlib: { level: 9 } });

  archive.pipe(output);

  // Add files from dist directory to root of ZIP
  archive.file('dist/manifest.json', { name: 'manifest.json' });
  archive.file('dist/background.js', { name: 'background.js' });
  archive.file('dist/content.js', { name: 'content.js' });
  archive.file('dist/popup.js', { name: 'popup.js' });
  archive.file('dist/popup.html', { name: 'popup.html' });
  archive.file('dist/icon128.png', { name: 'icon128.png' });

  await archive.finalize();

  return new Promise((resolve, reject) => {
    output.on('close', () => {
      console.log(`✅ ZIP created: ${zipFilename} (${archive.pointer()} bytes)`);
      resolve();
    });
    output.on('error', reject);
  });
}

try {
  await createZip();
  console.log('🎉 Extension packaged successfully!');
  console.log('📋 Ready for Chrome Web Store upload');
} catch (err) {
  console.error('❌ Failed to create ZIP:', err.message);
  process.exit(1);
} 