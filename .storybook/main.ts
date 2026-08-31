import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/nextjs-vite';

const mockPath = fileURLToPath(new URL('../__mocks__/next/navigation.ts', import.meta.url));

const config: StorybookConfig = {
  stories: ['../shared/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-vitest',
  ],
  framework: {
    name: '@storybook/nextjs-vite',
    options: {},
  },
  staticDirs: ['../public'],
  async viteFinal(config) {
    return {
      ...config,
      plugins: [
        ...(config.plugins || []),
        {
          name: 'mock-next-navigation',
          resolveId(source) {
            if (source === 'next/navigation') {
              return mockPath;
            }
          },
        },
      ],
      resolve: {
        alias: {
          ...(typeof config.resolve?.alias === 'object' && !Array.isArray(config.resolve?.alias) ? config.resolve.alias : {}),
          'next/navigation': mockPath,
        },
      },
      optimizeDeps: {
        ...config.optimizeDeps,
        exclude: [...(config.optimizeDeps?.exclude || []), 'next/navigation'],
      },
    };
  },
};

export default config;