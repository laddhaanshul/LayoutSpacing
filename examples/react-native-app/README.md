# React Native (Expo) Example - @laddhaanshul/layout-spacing

This example demonstrates how to use `@laddhaanshul/layout-spacing` in a React Native application built with Expo.

## Features Demonstrated
- **Cross-Platform Compatibility**: The exact same components (`Box`, `Flex`, `Stack`) and hooks (`useBreakpoint`) used in the web example.
- **Native Optimization**: components automatically render as `View` and handle numeric style values correctly.
- **Responsive Logic**: Mobile-first responsive design using the unified responsive engine.

## Running Locally

1. Install dependencies from the monorepo root:
   ```bash
   pnpm install
   ```

2. Start the Expo server:
   ```bash
   pnpm example:native
   ```

3. Press `i` for iOS simulator, `a` for Android, or scan the QR code with Expo Go.

## Key Files
- `App.tsx`: Unified layout demonstration.
- `app.json`: Expo configuration.
- `metro.config.js`: Monorepo-aware Metro configuration.
