import type { StorybookConfig } from '@storybook/nextjs';
import { VanillaExtractPlugin } from '@vanilla-extract/webpack-plugin';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'msw-storybook-addon',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['static'],
  webpackFinal: async (config) => {
    if (!config.plugins) config.plugins = [];
    config.plugins.push(new VanillaExtractPlugin());

    config.resolve = {
      ...(config.resolve || {}),
      alias: {
        ...(config.resolve?.alias || {}),
        '@': path.resolve(__dirname, '../src'),
      },
    };

    return config;
  },
};

export default config;
