import { math } from 'polished';

const components = {
  Button: {
    spx: '12px',
    mpx: '12px',
    lpx: '14px',

    sFontSize: '12px',
    mFontSize: '12px',
    lFontSize: '14px',

    // iconSize = fontSize * lineHeight
    sIconSize: math('12px * 1.5'),
    mIconSize: math('12px * 1.5'),
    lIconSize: math('14px * 1.5'),

    textPrimary: 'colors.emphasis.0',
    bgPrimary: 'colors.brand.normal',
    borderColorPrimary: 'colors.brand.normal',

    textPrimaryHover: 'colors.emphasis.0',
    bgPrimaryHover: 'colors.brand.hover',
    borderColorPrimaryHover: 'colors.brand.hover',

    textPrimaryActive: 'colors.emphasis.0',
    bgPrimaryActive: 'colors.brand.active',
    borderColorPrimaryActive: 'colors.brand.active',

    outlinePrimary: 'rgba(56, 98, 207, .1)',

    textSecondary: 'colors.brand.normal',
    bgSecondary: 'colors.emphasis.0',
    borderColorSecondary: 'colors.brand.normal',

    textSecondaryHover: 'colors.emphasis.0',
    bgSecondaryHover: 'colors.brand.normal',
    borderColorSecondaryHover: 'colors.brand.normal',

    textSecondaryActive: 'colors.emphasis.0',
    bgSecondaryActive: 'colors.primary.60',
    borderColorSecondaryActive: 'colors.primary.60',

    outlineSecondary: 'rgba(56, 98, 207, .1)',

    textNormal: 'colors.text.body',
    bgNormal: 'colors.emphasis.0',
    borderColorNormal: 'colors.line.normal',

    textNormalHover: 'colors.emphasis.0',
    bgNormalHover: 'colors.emphasis.70',
    borderColorNormalHover: 'colors.emphasis.70',

    textNormalActive: 'colors.emphasis.0',
    bgNormalActive: 'colors.emphasis.80',
    borderColorNormalActive: 'colors.emphasis.80',

    outlineNormal: 'rgba(67, 67, 67, .1)',

    /**
     * @label 禁用文本色
     */
    textDisabled: 'colors.text.disabled',
    /**
     * @label 禁用背景色
     */
    bgDisabled: 'colors.fill.disabled',
    /**
     * @label 禁用边框色
     */
    borderColorDisabled: 'colors.fill.disabled',
  },

  TextButton: {
    colorPrimary: 'colors.brand.normal',

    colorPrimaryHover: 'colors.brand.hover',
    bgPrimaryHover: 'colors.emphasis.10',

    colorPrimaryActive: 'colors.brand.active',
    bgPrimaryActive: 'colors.emphasis.10',

    colorNormal: 'colors.text.body',

    colorNormalHover: 'colors.brand.normal',
    bgNormalHover: 'colors.emphasis.10',

    colorNormalActive: 'colors.brand.active',
    bgNormalActive: 'colors.emphasis.10',
  },

  WarningButton: {
    textPrimary: 'colors.emphasis.0',
    bgPrimary: 'colors.error.normal',
    borderColorPrimary: 'colors.error.normal',

    textPrimaryHover: 'colors.emphasis.0',
    bgPrimaryHover: 'colors.error.hover',
    borderColorPrimaryHover: 'colors.error.hover',

    textPrimaryActive: 'colors.emphasis.0',
    bgPrimaryActive: 'colors.error.active',
    borderColorPrimaryActive: 'colors.error.active',

    textNormal: 'colors.error.normal',
    bgNormal: 'colors.emphasis.0',
    borderColorNormal: 'colors.error.normal',

    textNormalHover: 'colors.emphasis.0',
    bgNormalHover: 'colors.error.normal',
    borderColorNormalHover: 'colors.error.normal',

    textNormalActive: 'colors.emphasis.0',
    bgNormalActive: 'colors.error.active',
    borderColorNormalActive: 'colors.error.active',

    outline: 'rgba(235, 65, 65, .3)',
  },

  Breadcrumb: {
    textColor: 'colors.emphasis.60',
    textColorActive: 'colors.emphasis.90',
    textColorHover: 'colors.emphasis.90',
  },

  Input: {
    width: '240px',

    borderColor: 'colors.line.border',
    borderColorHover: 'colors.brand.hover',
    borderColorFocus: 'rgba(56, 98, 207, .1)',
    borderColorDisabled: 'colors.fill.disabled',

    borderColorError: 'colors.error.normal',
    borderColorErrorFocus: 'rgba(235, 65, 65, .1)',
    borderColorWarning: 'colors.warning.normal',
    borderColorWarningFocus: 'rgba(255, 169, 0, .1)',
    borderColorSuccess: 'colors.success.normal',
    borderColorSuccessFocus: 'rgba(50, 179, 87, .1)',

    textColor: 'colors.text.body',
    textColorDisabled: 'colors.text.disabled',

    bg: 'transparent',
    bgDisabled: 'colors.fill.disabled',

    addonBg: 'colors.primary.10',
    addonTextColor: 'colors.text.body',

    elementTextColor: 'colors.text.body',
    elementFontSize: '16px', // body * 1.5
  },

  TimePicker: {
    triggerWidth: '200px',
    normalPanelWidth: '200px',
    simplePanelWidth: '200px',
    panelMenuItemHeight: '28px', // 需要保持和日期组件的格子一样大

    listEndMaskBg:
      'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.65) 35%, rgba(255, 255, 255, 0.95) 100%)',
  },

  DatePicker: {
    triggerWidth: '196px',
    normalTimeCardWidth: '196px',
    simpleTimeCardWidth: '136px',
    monthCardWidth: '230px',
    dateCellSize: '28px',
    dateCellDotSize: '4px',

    dateCellInRangeBg: 'colors.primary.10',
    dateCellInRangeBgHover: 'colors.primary.20',

    dateCellActiveBg: 'colors.brand.normal',
    dateCellActiveColor: 'colors.emphasis.0',
  },

  DateRangePicker: {
    triggerWidth: '342px',
    startTriggerWidth: '144px',
  },

  FilePicker: {
    normalTriggerDisplay: 'inline-flex',
    normalTriggerWidth: '120px',
  },

  Radio: {
    radioSize: '14px',
    radioMarkSize: '6px',
    radioMarkOffset: '3px', // (size - markSize - 2)/2
  },

  Checkbox: {
    size: '16px',
    iconSize: '8px',
  },

  Switch: {
    small: {
      width: '32px',
      height: '18px',
      trackHeight: '14px',
      sliderOffsetTop: '2px',
      sliderCheckedTransform: 'translateX(15px)',
    },

    medium: {
      width: '48px',
      height: '26px',
      trackHeight: '20px',
      sliderOffsetTop: '3px', // (height - trackHeight)/2
      sliderCheckedTransform: 'translateX(22px)',
    },
  },

  Tree: {
    rowHeight: '32px',
    labelHeight: '20px',
    labelPadding: '0 4px',
    labelMargin: '0 0 0 4px',
  },

  Select: {
    triggerHeight: '32px',
    rowHeight: '28px',
  },
};

export default components;
