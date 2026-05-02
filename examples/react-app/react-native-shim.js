// Shim for react-native when building for web with Vite
// This prevents esbuild from parsing react-native source (which contains Flow syntax)
// The core package uses require('react-native') inside try-catch for RN platform detection
module.exports = {
  Dimensions: {
    get: () => ({ width: 1024, height: 768 }),
    addEventListener: () => ({ remove: () => {} }),
  },
  Platform: { OS: 'web' },
};

