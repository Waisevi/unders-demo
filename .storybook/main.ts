import path from 'node:path';

import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  addons: ['@storybook/addon-links', 'msw-storybook-addon'],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['static'],
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  webpackFinal: async (config) => {
    if (!config.plugins) {
      config.plugins = [];
    }

    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        '@': path.resolve(import.meta.dirname, '../src'),
      },
    };

    return config;
  },
};

export default config;
