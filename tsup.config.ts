import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  shims: true,
  dts: true,
  clean: true,
  format: ['esm'],
});
