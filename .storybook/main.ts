import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding"
  ],
  "framework": "@storybook/react-vite",
  viteFinal: async (config) => {
    const { default: tailwindcss } = await import('@tailwindcss/vite');
    
    if (!config.plugins) {
      config.plugins = [];
    }
    
    config.plugins.unshift(tailwindcss());
    return config;
  }
};
export default config;