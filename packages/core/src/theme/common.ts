const common = {
  colors: {
    //----------------------
    // 基础色板
    //----------------------
    primary: {
      10: '#c9d9f7',
      20: '#a4bbed',
      30: '#7f9be3',
      40: '#5b7ad9',
      50: '#3858cf', // base
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
      95: '#141414',
      100: '#000000',
    },

    red: {
      10: '#ffd6d0',
      20: '#ffb9b2',
      30: '#ff9890',
      40: '#f56d69',
      50: '#eb4141',
      60: '#c52f34',
      70: '#a12028',
      80: '#80141f',
    },

    green: {
      10: '#b4dcba',
      20: '#93d29e',
      30: '#72c784',
      40: '#51bd6d',
      50: '#32b357',
      60: '#228d44',
      70: '#156933',
      80: '#0b4823',
    },

    yellow: {
      10: '#ffea99',
      20: '#ffde73',
      30: '#ffcf4d',
      40: '#ffbd26',
      50: '#ffa900',
      60: '#d98500',
      70: '#b36500',
      80: '#8c4800',
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
      95: 'colors.gray.95',
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
    m: '2px',
    l: '4px',
    xl: '4px',
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
      s: '24px',
      m: '32px',
      l: '40px',
      xl: '48px',
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
