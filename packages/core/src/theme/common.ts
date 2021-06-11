const common = {
  colors: {
    //----------------------
    // 基础色板
    //----------------------
    primary: {
      0: '#f0f7fe',
      10: '#e8f2ff',
      20: '#b8cff5',
      30: '#89aae8',
      40: '#5e86db',
      50: '#3862cf', // base
      60: '#2546a8',
      70: '#162d82',
      80: '#162d82',
      90: '#060d36',
    },

    secondary: {
      0: '#f0fff7',
      10: '#f0fff8',
      20: '#c9f5e1',
      30: '#99e8c7',
      40: '#6edbb1',
      50: '#46cf9f',
      60: '#31a882',
      70: '#1f8266',
      80: '#115c49',
      90: '#0a362c',
    },

    // TIP: 不要直接使用，使用 emphasis 代替
    gray: {
      0: '#ffffff',
      10: '#f5f5f5',
      20: '#f0f0f0',
      30: '#dddddd',
      40: '#bfbfbf',
      50: '#8c8c8c',
      60: '#595959',
      70: '#434343',
      80: '#262626',
      90: '#1f1f1f',
      95: '#141414', // TODO: 考虑去掉 95，只留 11 个
      100: '#000000',
    },

    red: {
      0: '#fff2f0',
      10: '#ffedeb',
      20: '#ffc8c2',
      30: '#ffa099',
      40: '#f7716d',
      50: '#eb4141',
      60: '#c42d32',
      70: '#9e1c25',
      80: '#78101a',
      90: '#520A13',
    },

    green: {
      0: '#e4f2e5',
      10: '#d3e6d6',
      20: '#a5d9ae',
      30: '#7acc8c',
      40: '#54bfcf',
      50: '#32b357',
      60: '#208c42',
      70: '#126630',
      80: '#08401e',
      90: '#031a0c',
    },

    yellow: {
      0: '#fffbe6',
      10: '#ffeda3',
      20: '#ffe07a',
      30: '#ffd152',
      40: '#ffbf29',
      50: '#ffa900',
      60: '#d98900',
      70: '#b36b00',
      80: '#8c4f00',
      90: '#663600',
    },

    // 强调色，可用于边框，背景，文本
    emphasis: {
      0: 'colors.gray.0',
      10: 'colors.gray.10',
      20: 'colors.gray.20',
      30: 'colors.gray.30',
      40: 'colors.gray.40',
      50: 'colors.gray.50',
      60: 'colors.gray.60',
      70: 'colors.gray.70',
      80: 'colors.gray.80',
      90: 'colors.gray.90',
      100: 'colors.gray.100',
    },

    //----------------------
    // 语义化色板
    //----------------------

    brand: {
      normal: 'colors.primary.50',
      hover: 'colors.primary.60',
      active: 'colors.primary.70',
      disabled: 'colors.primary.10',
    },

    link: {
      normal: 'colors.primary.50',
      hover: 'colors.primary.60',
      active: 'colors.primary.70',
      disabled: 'colors.primary.10',
    },

    text: {
      /**
       * 禁用文本色
       */
      disabled: 'colors.emphasis.40',

      title: 'colors.emphasis.90',
      subtitle: 'colors.emphasis.80',
      body: 'colors.emphasis.90',
      /**
       * @label 备注文本色
       */
      note: 'colors.emphasis.50',
      placeholder: 'colors.emphasis.50',
    },

    fill: {
      /**
       * 首选禁用背景色
       */
      disabled: 'colors.emphasis.10',
      /**
       * 备选禁用背景色
       */
      disabled2: 'colors.emphasis.30',

      /**
       * 首选背景色
       */
      layer1: 'colors.emphasis.10',
      /**
       * 次选背景色
       */
      layer2: 'colors.emphasis.30',
      layer3: 'colors.emphasis.40',

      /**
       * 最浅色背景
       */
      light: 'colors.emphasis.0',
      /**
       * 表头
       */
      tableHead: 'colors.emphasis.20',
    },

    line: {
      normal: 'colors.emphasis.40',
      hover: 'colors.emphasis.70',
      active: 'colors.emphasis.80',
      disabled: 'colors.emphasis.30',

      border: 'colors.gray.40',
      divider: 'colors.gray.30',
    },

    success: {
      normal: 'colors.green.50',
      hover: 'colors.green.60',
      active: 'colors.green.70',
      disabled: 'colors.green.10',
    },

    error: {
      normal: 'colors.red.50',
      hover: 'colors.red.60',
      active: 'colors.red.70',
      disabled: 'colors.red.10',
    },

    warning: {
      normal: 'colors.yellow.50',
      hover: 'colors.yellow.60',
      active: 'colors.yellow.70',
      disabled: 'colors.yellow.10',
    },
  },

  fontSizes: {
    note: '12px',

    body: '12px',
    base: '12px',

    subtitle: '14px',
    title: '16px',
    subheader: '20px',
    header: '24px',
  },

  lineHeights: {
    body: '1.5',
  },

  borders: {
    solid: '1px solid',
    dashed: '1px dashed',
  },

  radii: {
    none: '0',
    s: '2px',
    m: '4px',
    l: '8px',
    xl: '8px',
  },

  shadows: {
    lowUp: '0px -1px 2px -2px rgba(0,0,0,0.16),0px -2px 4px 0px rgba(0,0,0,0.12),0px -4px 12px 4px rgba(0,0,0,0.08)',
    lowRight: '1px 0px 2px -2px rgba(0,0,0,0.16),2px 0px 4px 0px rgba(0,0,0,0.12),4px 0px 12px 4px rgba(0,0,0,0.08)',
    lowDown: '0px 1px 2px -2px rgba(0,0,0,0.16),0px 2px 4px 0px rgba(0,0,0,0.12),0px 4px 12px 4px rgba(0,0,0,0.08)',
    lowleft: '-1px 0px 2px -2px rgba(0,0,0,0.16),-2px 0px 4px 0px rgba(0,0,0,0.12),-4px 0px 12px 4px rgba(0,0,0,0.08)',

    medianUp:
      '0px -4px 8px -4px rgba(0,0,0,0.12),0px -8px 16px 0px rgba(0,0,0,0.08),0px -12px 24px 8px rgba(0,0,0,0.04)',
    medianRight:
      '4px 0px 8px -4px rgba(0,0,0,0.12),8px 0px 16px 0px rgba(0,0,0,0.08),12px 0px 24px 8px rgba(0,0,0,0.04)',
    medianDown:
      '0px 4px 8px -4px rgba(0,0,0,0.12),0px 8px 16px 0px rgba(0,0,0,0.08),0px 12px 24px 8px rgba(0,0,0,0.04)',
    medianLeft:
      '-4px 0px 8px -4px rgba(0,0,0,0.12),-8px 0px 16px 0px rgba(0,0,0,0.08),-12px 0px 24px 8px rgba(0,0,0,0.04)',

    highUp:
      '0px -8px 16px -8px rgba(0,0,0,0.08),0px -12px 24px 12px rgba(0,0,0,0.04),0px -16px 48px 16px rgba(0,0,0,0.02)',
    highRight:
      '8px 0px 16px -8px rgba(0,0,0,0.08),12px 0px 24px 12px rgba(0,0,0,0.04),16px 0px 48px 16px rgba(0,0,0,0.02)',
    highDown:
      '0px 8px 16px -8px rgba(0,0,0,0.08),0px 12px 24px 12px rgba(0,0,0,0.04),0px 16px 48px 16px rgba(0,0,0,0.02)',
    highLeft:
      '-8px 0px 16px -8px rgba(0,0,0,0.08),-12px 0px 24px 12px rgba(0,0,0,0.04),-16px 0px 48px 16px rgba(0,0,0,0.02)',
  },

  space: {
    s: '4px',
    m: '8px',
    l: '12px',
    xl: '16px',
    xxl: '18px',
  },

  sizes: {
    s1: '4px',
    s2: '8px',
    s3: '12px',
    s4: '16px',
    s5: '20px',
    s6: '24px',
    s7: '28px',
    s8: '32px',
    s9: '36px',
    s10: '40px',
    s11: '44px',
    s12: '48px',
    s13: '52px',
    s14: '56px',
    s15: '60px',
    s16: '64px',
    s17: '68px',
    s18: '72px',
    s19: '76px',
    s20: '80px',

    formHeights: {
      s: '26px',
      m: '34px',
      l: '41px',
    },
  },

  zIndices: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },
};

export default common;
