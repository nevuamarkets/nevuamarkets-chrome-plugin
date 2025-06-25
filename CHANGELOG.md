# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-12-19

### Added
- Initial release of Nevua Markets Chrome Extension
- Price alerts for Polymarket markets
- Background service worker for notifications
- Content script injection for market data
- Popup interface for managing alerts
- Chrome Web Store ready package with optimized build
- Review-friendly build option for easier Google review process

### Technical
- Manifest V3 compliance
- Production build optimizations (minification, tree-shaking)
- Review build mode with unminified code and sourcemaps
- Browser-compatible shims for Node.js modules
- Proper ZIP packaging for Chrome Web Store submission
- Versioned ZIP filenames with production/review variants 