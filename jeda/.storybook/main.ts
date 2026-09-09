import type { StorybookConfig } from '@storybook/nextjs-vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  // DDD: canonical stories live under src/** (shared & domains/presentation)
  // Legacy `stories/` folder is deprecated – kept for reference, not indexed to avoid duplicate IDs
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp"
  ],
  "framework": "@storybook/nextjs-vite",
  "staticDirs": [
    "../public"
  ],
  viteFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname, "../src"),
      "@/shared": path.resolve(__dirname, "../src/shared"),
      "@/domains": path.resolve(__dirname, "../src/domains"),
      "@/app": path.resolve(__dirname, "../src/app"),
    };
    return config;
  },
};
export default config;