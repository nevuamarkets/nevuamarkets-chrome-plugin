# Nevua Markets Chrome Extension

A Chrome extension for setting price alerts on Polymarket markets. Get notified when market prices reach your desired thresholds.

## Features

- 🔔 **Price Alerts**: Set custom price alerts for any Polymarket market
- 📊 **Real-time Monitoring**: Background monitoring of market prices
- 🎯 **Targeted Notifications**: Chrome notifications when alerts trigger
- 🚀 **Fast Performance**: Optimized with background service workers
- 🛡️ **Privacy-Focused**: Only accesses Polymarket domains

## Installation

### From Chrome Web Store


### Developer Installation
1. Download the latest release ZIP file
2. Extract the contents
3. Open Chrome and go to `chrome://extensions/`
4. Enable "Developer mode" in the top right
5. Click "Load unpacked" and select the extracted folder

## Development

### Prerequisites
- Node.js 18+ 
- npm

### Setup
```bash
# Clone the repository
git clone <repository-url>
cd nevuamarkets-chrome-plugin

# Install dependencies
npm install
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run build` | Development build with sourcemaps |
| `npm run build:prod` | Production build (minified, no sourcemaps) |
| `npm run build:review` | Review build (unminified, with sourcemaps) |
| `npm run package` | Build and create Chrome Web Store ZIP (production) |
| `npm run package:review` | Build and create Chrome Web Store ZIP (review-friendly) |
| `npm run lint` | Run linting (placeholder - add ESLint if needed) |
| `npm run test` | Run tests (placeholder - add testing framework if needed) |

### Development Workflow

1. **Development Build**
   ```bash
   npm run build
   ```
   - Creates `dist/` folder with unminified code
   - Includes sourcemaps for debugging
   - Load unpacked extension from `dist/` folder

2. **Production Build**
   ```bash
   npm run build:prod
   ```
   - Minified and optimized for production
   - No sourcemaps
   - Tree-shaking removes unused code

3. **Chrome Web Store Package**
   ```bash
   # Production package (minified)
   npm run package
   
   # Review package (unminified, easier for Google reviewers)
   npm run package:review
   ```
   - Production: Creates `nevuamarkets-chrome-extension-<version>.zip`
   - Review: Creates `nevuamarkets-chrome-extension-<version>-review.zip`
   - Review builds are unminified with sourcemaps for easier code review

### Project Structure

```
nevuamarkets-chrome-plugin/
├── manifest.json          # Extension manifest (V3)
├── background.js          # Service worker script
├── content.js            # Content script for Polymarket
├── popup.html            # Extension popup UI
├── popup.js              # Popup functionality
├── icon128.png           # Extension icon
├── build.mjs             # Development build script
├── package.mjs           # Production packaging script
├── shims/                # Browser compatibility shims
│   ├── crypto.js
│   ├── winston.js
│   └── ws.js
└── reference_data/       # Development reference files
```

### Build System

The extension uses **esbuild** for fast, optimized bundling:

- **Tree-shaking**: Removes unused code
- **Minification**: Reduces file size for production
- **Browser shims**: Replaces Node.js modules with browser-compatible versions
- **Bundle optimization**: Single file output per script

### Chrome Extension Architecture

- **Manifest V3**: Latest Chrome extension standard
- **Service Worker**: Background script for notifications and monitoring
- **Content Scripts**: Injected into Polymarket pages for data access
- **Popup Interface**: User interface for managing alerts

### Dependencies

#### Runtime Dependencies
- `@nevuamarkets/poly-websockets`: WebSocket connection to Polymarket data

#### Development Dependencies
- `esbuild`: Fast JavaScript bundler
- `archiver`: ZIP file creation for packaging

### Browser Compatibility

- **Chrome**: 110+
- **Edge**: 110+ (Chromium-based)
- **Brave**: 110+ (Chromium-based)

### Extension Permissions

| Permission | Purpose |
|------------|---------|
| `notifications` | Show price alert notifications |
| `scripting` | Inject content scripts into Polymarket |
| `storage` | Save user alert preferences |
| `host_permissions` | Access Polymarket.com for market data |

## Publishing to Chrome Web Store

1. **Prepare Release**
   ```bash
   # Update version in package.json and manifest.json
   npm version patch  # or minor/major
   
   # Update CHANGELOG.md with new version
   # Create both packages
   npm run package         # Production (minified)
   npm run package:review  # Review-friendly (unminified)
   ```

2. **Upload to Store**
   - Visit [Chrome Developer Dashboard](https://chrome.google.com/webstore/devconsole/)
   - **Recommended**: Upload the review package first (`-review.zip`) for easier code review by Google
   - Alternatively, upload the production package if you prefer minified code
   - Complete store listing information
   - Submit for review

3. **Review Process Tips**
   - The review build (`-review.zip`) contains unminified code with sourcemaps
   - This makes it significantly easier for Google reviewers to understand your code
   - Both packages contain identical functionality, just different code formatting

3. **Version Requirements**
   - Each upload must have a higher semantic version
   - Update both `package.json` and `manifest.json`
   - Document changes in `CHANGELOG.md`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with `npm run build` and load unpacked extension
5. Create a pull request

## License

ISC License

## Support

For issues and feature requests, please create an issue in the repository. 