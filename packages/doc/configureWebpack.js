const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ReactDocgenTypescriptPlugin = require('react-docgen-typescript-plugin').default;
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const micromatch = require('micromatch');
// const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = function () {
  return {
    name: 'custom-configureWebpack',

    configureWebpack() {
      return {
        module: {
          rules: [
            {
              test: /\.tsx?$/,
              exclude: /node_modules/,
              use: [{ loader: 'ts-loader', options: { transpileOnly: true } }],
            },
            {
              test: micromatch.matcher('**/packages/story/**/*.tsx'),
              include: [path.resolve(__dirname, '../story')],
              use: [
                {
                  loader: 'babel-loader',
                  options: {
                    presets: [require.resolve('@docusaurus/core/lib/babel/preset')],
                    plugins: ['babel-plugin-attach-doc-info'],
                  },
                },
              ],
            },
          ],
        },
        plugins: [
          new ReactDocgenTypescriptPlugin({
            propFilter: (prop) => {
              // todo 移除没有注释的 prop 的文档

              const isFromNodeModules = prop.parent == null || prop.parent.fileName.includes('node_modules');
              // 移除所有来自 node_modules 中的字段定义
              return !isFromNodeModules;
            },
          }),
          // TODO 换成 webpack5 option
          new FilterWarningsPlugin({
            exclude: /Attempted import error/,
          }),
          // TODO webpack5 需要使用
          // new NodePolyfillPlugin(),
        ],
        resolve: {
          plugins: [new TsconfigPathsPlugin()],
        },
      };
    },
  };
};
