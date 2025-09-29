/*
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
*/
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        contact: resolve(__dirname, 'contact.html'),
        destinations: resolve(__dirname, 'destinations.html'),
        services: resolve(__dirname, 'services.html'),
        // read-more pages
        downSouth: resolve(__dirname, 'destination-down-south.html'),
        upCountry: resolve(__dirname, 'destination-up-country.html'),
        culturalTriangle: resolve(__dirname, 'destination-cultural-triangle.html'),
        eastCoast: resolve(__dirname, 'destination-east-coast.html'),
        colombo: resolve(__dirname, 'destination-colombo.html'),
        centralHighlands: resolve(__dirname, 'destination-central-highlands.html'),
        wildlifeNature: resolve(__dirname, 'destination-wildlife-nature.html'),
      },
    },
  },
});
