const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ModuleDependencyWarning = require('webpack/lib/ModuleDependencyWarning');

// TODO webpack5 中有对应的配置
class IgnoreNotFoundExportPlugin {
  apply(compiler) {
    const messageRegExp = /export '.*'( \(reexported as '.*'\))? was not found in/;
    function doneHook(stats) {
      stats.compilation.warnings = stats.compilation.warnings.filter(function (warn) {
        return !(warn instanceof ModuleDependencyWarning && messageRegExp.test(warn.message));
      });
    }
    if (compiler.hooks) {
      compiler.hooks.done.tap('IgnoreNotFoundExportPlugin', doneHook);
    } else {
      compiler.plugin('done', doneHook);
    }
  }
}

module.exports = {
  // todo webpack5
  // core: {
  //   builder: 'webpack5',
  // },

  stories: ['../src/**/*.stories.tsx'],

  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        actions: false,
        backgrounds: false,
      },
    },
  ],

  babel: async (config) => {
    config.plugins.push('babel-plugin-styled-components');
    return config;
  },

  webpack: async (config) => {
    if (config.mode === 'production') {
      // 在生产环境下关闭 devtool
      config.devtool = false;
    }

    if (config.resolve.plugins == null) {
      config.resolve.plugins = [];
    }
    config.resolve.plugins.push(new TsconfigPathsPlugin());
    config.plugins.push(new IgnoreNotFoundExportPlugin());

    return config;
  },
};
