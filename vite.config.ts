import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  // Auto-generate version.json with unique build version to invalidate user cache upon new deploys
  try {
    const dataDir = path.resolve(__dirname, './public/data');

    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const buildVersion = `v-${Date.now()}`;

    fs.writeFileSync(
      path.resolve(dataDir, 'version.json'),
      JSON.stringify({ version: buildVersion }, null, 2)
    );

    console.log(
      `[Auto-Version] Generated version.json with build version: ${buildVersion}`
    );
  } catch (err) {
    console.error('[Auto-Version] Failed to write version.json:', err);
  }

  return {
    plugins: [
      react(),
      tailwindcss()
    ],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },

    build: {
      // Vercel requires the final output folder to be inside the project
      outDir: 'dist',
      emptyOutDir: true,
    }
  };
});