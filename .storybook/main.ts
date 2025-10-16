import type { StorybookConfig as StorybookConfigVite } from '@storybook/vue3-vite';
import type { StorybookConfig } from '@storybook-vue/nuxt';

const config: StorybookConfig & Pick<StorybookConfigVite, 'previewHead'> = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    // '@storybook/addon-links',
    // '@storybook/addon-essentials',
    // '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook-vue/nuxt',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  previewHead: (head) =>
    `${head}<style lang="css">body { font-family: 'Manrope', sans-serif !important; }</style>`,
};
export default config;
