import { extendTheme } from '../theme';

export const colors = {
  //----------------------
  // 基础色板（基于 light 扩展）
  //----------------------
  primary: {
    10: '#a1b8ea',
    20: '#7a94d9',
    30: '#5470c5',
    40: '#334eb3', // base
    50: '#2b40be',
    60: '#243368',
    70: '#1f284c',
    80: '#191f39',
  },

  secondary: {
    10: '#b1ead0',
    20: '#89d9b7',
    30: '#61c5a0',
    40: '#3fb38a',
    50: '#358e6e',
    60: '#2b6853',
    70: '#234c3e',
    80: '#1c3930',
  },

  emphasis: {
    0: 'colors.gray.100',
    10: 'colors.gray.95',
    20: 'colors.gray.90',
    30: 'colors.gray.80',
    40: 'colors.gray.70',
    50: 'colors.gray.60',
    60: 'colors.gray.50',
    70: 'colors.gray.40',
    80: 'colors.gray.30',
    90: 'colors.gray.20',
    95: 'colors.gray.10',
    100: 'colors.gray.0',
  },

  //----------------------
  // 语义化色板（基于 light 扩展）
  //----------------------
};

export default extendTheme({
  colors,

  components: {
    Button: {
      bgSecondary: 'transparent',
      bgNormal: 'transparent',
    },
    WarningButton: {
      bgNormal: 'transparent',
      bgNormalHover: 'colors.error.normal',
    },
    Input: {},
  },
});
