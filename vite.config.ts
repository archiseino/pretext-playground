import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

function getHtmlInputs(): Record<string, string> {
  const cwd = process.cwd();
  const htmlFiles = readdirSync(cwd).filter((file: string) =>
    file.endsWith('.html'),
  );

  return Object.fromEntries(
    htmlFiles.map((file) => [file.replace(/\.html$/i, ''), resolve(cwd, file)]),
  );
}

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: getHtmlInputs(),
    },
  },
});
