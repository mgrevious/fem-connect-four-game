import { defineConfig, mergeConfig, configDefaults } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      ...configDefaults,
      environment: 'jsdom',
      setupFiles: ['./test/setup.ts'],
      globals: true,
    },
  })
);
