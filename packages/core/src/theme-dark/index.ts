import { rgba } from 'polished';
import { extendTheme } from '../theme';

export const colors = {
  //----------------------
  // 基础色板（基于 light 扩展）
  //----------------------
  primary: {
    10: '#c9d9f7',
    20: '#a4bbed',
    30: '#7f9be3',
    40: '#5b7ad9',
    50: '#3862cf', // base
    60: '#273ea8',
    70: '#182985',
    80: '#0f1963',
  },

  secondary: {
    10: '#daf7e9',
    20: '#b4edd4',
    30: '#8fe3c0',
    40: '#5ad9af',
    50: '#46cf9f',
    60: '#32a883',
    70: '#228569',
    80: '#166350',
  },

  emphasis: {
    0: 'colors.gray.100',
    10: 'colors.gray.90',
    20: 'colors.gray.80',
    30: 'colors.gray.70',
    40: 'colors.gray.60',
    50: 'colors.gray.50',
    60: 'colors.gray.40',
    70: 'colors.gray.30',
    80: 'colors.gray.20',
    90: 'colors.gray.10',
    100: 'colors.gray.0',
  },

  text: {
    disabled: 'colors.emphasis.50',
  },

  fill: {
    disabled: 'colors.emphasis.10',
  },

  line: {
    border: 'colors.emphasis.50',
  },

  //----------------------
  // 语义化色板（基于 light 扩展）
  //----------------------
};

export const components = {
  Button: {
    textPrimary: 'colors.emphasis.100',
    textPrimaryHover: 'colors.emphasis.100',

    bgSecondary: 'transparent',
    textSecondaryHover: 'colors.emphasis.100',

    bgNormal: 'transparent',
    borderColorNormal: 'colors.emphasis.60',

    outlineNormal: 'rgba(140, 140, 140, .2)',
  },

  TextButton: {
    bgNormalHover: 'colors.emphasis.20',
  },

  WarningButton: {
    textPrimary: 'colors.emphasis.100',
    textPrimaryHover: 'colors.emphasis.100',

    bgNormal: 'transparent',
    textNormalHover: 'colors.emphasis.100',
    bgNormalHover: 'colors.error.normal',
  },

  Input: {
    addonBg: 'colors.primary.80',
    addonTextColor: 'colors.text.body',
  },

  DatePicker: {
    dateCellInRangeBg: rgba('#c9d9f7', 0.2),
    // dateCellInRangeBgHover: 'colors.primary.20',

    // dateCellActiveBg: 'colors.brand.normal',
    dateCellActiveColor: 'colors.emphasis.100',
  },

  TimePicker: {
    listEndMaskBg:
      'linear-gradient(180deg, rgba(48, 48, 48, 0) 0%, rgba(48, 48, 48, 0.65) 35%, rgba(48, 48, 48, 0.95) 100%)',
  },
};

export default extendTheme({
  colors,

  components,
});
