const components = {
  Button: {
    spx: '12px',
    mpx: '12px',
    lpx: '14px',

    sFontSize: '12px',
    mFontSize: '12px',
    lFontSize: '14px',

    textPrimary: 'colors.emphasis.0',
    bgPrimary: 'colors.brand.normal',
    borderColorPrimary: 'colors.brand.normal',

    textPrimaryHover: 'colors.emphasis.0',
    bgPrimaryHover: 'colors.brand.hover',
    borderColorPrimaryHover: 'colors.brand.hover',

    textPrimaryActive: 'colors.emphasis.0',
    bgPrimaryActive: 'colors.brand.active',
    borderColorPrimaryActive: 'colors.brand.active',

    textSecondary: 'colors.brand.normal',
    bgSecondary: 'colors.emphasis.0',
    borderColorSecondary: 'colors.brand.normal',

    textSecondaryHover: 'colors.emphasis.0',
    bgSecondaryHover: 'colors.brand.normal',
    borderColorSecondaryHover: 'colors.brand.normal',

    textSecondaryActive: 'colors.emphasis.0',
    bgSecondaryActive: 'colors.primary.60',
    borderColorSecondaryActive: 'colors.primary.60',

    textNormal: 'colors.text.body',
    bgNormal: 'colors.emphasis.0',
    borderColorNormal: 'colors.line.normal',

    textNormalHover: 'colors.emphasis.0',
    bgNormalHover: 'colors.emphasis.70',
    borderColorNormalHover: 'colors.emphasis.70',

    textNormalActive: 'colors.emphasis.0',
    bgNormalActive: 'colors.emphasis.80',
    borderColorNormalActive: 'colors.emphasis.80',

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
    borderColorDisabled: 'colors.line.disabled',
  },

  TextButton: {
    colorPrimary: 'colors.brand.normal',
    // bgPrimary: '',

    colorPrimaryHover: 'colors.brand.hover',
    bgPrimaryHover: 'colors.emphasis.10',

    colorPrimaryActive: 'colors.brand.active',
    bgPrimaryActive: 'colors.emphasis.10',

    colorNormal: 'colors.text.body',
    // bgNormal: '',

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
  },

  IconButton: {
    textColor: 'colors.text.body',
    bgHover: 'rgba(0, 0, 0, 0.06)',
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
    borderColorFocus: 'colors.brand.normal',
    borderColorDisabled: 'colors.fill.disabled',

    borderColorError: 'colors.error.normal',
    borderColorWarning: 'colors.warning.normal',
    borderColorSuccess: 'colors.success.normal',

    textColor: 'colors.text.body',
    textColorDisabled: 'colors.text.disabled',

    bg: 'transparent',
    bgDisabled: 'colors.fill.disabled',

    addonBg: 'colors.fill.layer2',
    addonTextColor: 'colors.text.body',

    elementTextColor: 'colors.text.body',
  },

  TimePicker: {
    triggerWidth: '180px',
    panelWidth: '200px',
    panelMenuItemHeight: '28px', // 需要保持和日期组件的格子一样大
  },

  DatePicker: {
    triggerWidth: '180px',
    direction: 'row',
    dateCardWidth: '280px',
    timeCardWidth: '200px',
    dateCellHeight: '28px',
    dateCardBorderRight: '1px solid var(--rex-colors-line-border)',
  },

  DateRangePicker: {
    triggerWidth: '292px',
  },

  FilePicker: {
    normalTriggerDisplay: 'inline-flex',
    normalTriggerWidth: '240px',
  },

  Radio: {
    radioSize: '16px',
    radioMarkSize: '6px',
    radioMarkOffset: '4px', // (size - markSize - 2)/2
  },

  Checkbox: {
    size: '16px',
    iconSize: '8px',
  },

  Switch: {
    width: '30px', // height * 2 - 2
    height: '16px',

    sliderSize: '16px',
    sliderCheckedTransform: 'translateX(14px)', // size - 2
  },

  Tree: {
    rowHeight: '32px',
    labelHeight: '20px',
    labelPadding: '0 4px',
    labelMargin: '0 0 0 4px',
  },

  Select: {
    triggerHeight: '32px',
    rowHeight: '32px',
  },
};

export default components;
