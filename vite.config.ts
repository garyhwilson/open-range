import { defineConfig } from 'vite';
import { extname, relative, resolve } from 'path';
import { fileURLToPath } from 'node:url';
import { glob } from 'glob';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import eslint from 'vite-plugin-eslint';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import libAssetsPlugin from '@laynezh/vite-plugin-lib-assets'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint(),
    libInjectCss(),
    dts({ include: ['lib'] }),
    libAssetsPlugin({
      outputPath: (url) => {
        return url.endsWith('.png') ? 'images' : 'assets'
      },
    })],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
      input: Object.fromEntries(
        glob.sync('lib/**/*.{ts,tsx}').map((file) => [
          // The name of the entry point
          // lib/nested/foo.ts becomes nested/foo
          relative('lib', file.slice(0, file.length - extname(file).length)),
          // The absolute path to the entry file
          // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
          fileURLToPath(new URL(file, import.meta.url)),
        ])
      ),
      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
      },
    },
  },
});
