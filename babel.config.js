'use strict';

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { chrome: '50' },
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: ['@babel/plugin-proposal-class-properties'],
};
