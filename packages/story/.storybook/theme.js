import { create } from '@storybook/theming/create';

export default create({
  base: 'light',

  colorPrimary: '#3858CF',
  colorSecondary: '#0075f9',

  // UI
  appBg: '#f5f5f5',
  appContentBg: 'white',
  appBorderColor: '#eee',
  appBorderRadius: 0,

  // Typography
  fontBase: 'Roboto, "Helvetica Neue", Helvetica, Tahoma, Arial, "PingFang SC", "Microsoft YaHei", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: 'black',
  textInverseColor: 'rgba(255,255,255,0.9)',

  brandTitle: 'ReX Design',
  brandUrl: 'https://alibaba.github.io/rex-design/',
  brandImage: 'https://img.alicdn.com/tfs/TB1_GefJhz1gK0jSZSgXXavwpXa-133-16.svg',
});
