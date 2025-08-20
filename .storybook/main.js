module.exports = {
  typescript: { reactDocgen: false },
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-docs",
    "@storybook/addon-controls",
    "@storybook/addon-actions",
    "@storybook/addon-styling-webpack",
    "@storybook/addon-themes",
    "storybook-tailwind-dark-mode", // check compatibility
    "storybook-react-intl",         // check compatibility
    "storybook-addon-next-router"
  ],
  framework: {
    name: "@storybook/react",
    options: {}
  },
  core: {
    builder: "webpack5"
  }
};
