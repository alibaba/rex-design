import { extendTheme } from '../theme';

export default extendTheme({
  fontSizes: {
    note: '10px',
    body: '14px',

    subtitle: '16px',
    title: '18px',
    subheader: '19px',
    header: '20px',
  },

  sizes: {
    formHeights: {
      s: '32px',
      m: '40px',
      l: '48px',
      xl: '52px',
    },
  },

  components: {
    Input: {
      width: '100%',
    },

    TimePicker: {
      triggerWidth: '100%',
      panelWidth: '90vw',
      panelMenuItemHeight: '40px', // 需要保持和日期组件的格子一样大
    },

    DatePicker: {
      triggerWidth: '100%',
      direction: 'column',
      dateCardWidth: '90vw',
      timeCardWidth: '90vw',
      dateCellHeight: '40px',
      dateCardBorderRight: '0',
    },

    DateRangePicker: {
      triggerWidth: '100%',
    },

    FilePicker: {
      normalTriggerDisplay: 'flex',
      normalTriggerWidth: '100%',
    },

    Radio: {
      radioSize: '22px',
      radioMarkSize: '8px',
      radioMarkOffset: '6px', // (size - markSize - 2)/2
    },

    Checkbox: {
      size: '22px',
      iconSize: '12px',
    },

    Switch: {
      width: '42px',
      height: '22px',

      sliderSize: '22px',
      sliderCheckedTransform: 'translateX(20px)',
    },

    Tree: {
      rowHeight: '42px',
      labelHeight: '24px',
      labelPadding: '0 6px',
      labelMargin: '0 0 0 6px',
    },
    Select: {
      triggerHeight: '42px',
      rowHeight: '42px',
    },
  },
});
