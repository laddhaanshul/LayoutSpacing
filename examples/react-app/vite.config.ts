import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Prevent Vite from bundling react-native (only used at runtime for RN platform detection)
      'react-native': path.resolve(__dirname, 'react-native-shim.js'),
    },
  },
  server: {
    port: 3000,
  },
});

