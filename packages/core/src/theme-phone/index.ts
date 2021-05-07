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
      s: '30px',
      m: '41px',
      l: '48px',
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
      small: {
        width: '44px',
        height: '24px',
        trackHeight: '14px',
        sliderOffsetTop: '5px',
        sliderCheckedTransform: 'translateX(20px)',
      },

      medium: {
        width: '60px',
        height: '32px',
        trackHeight: '20px',
        sliderOffsetTop: '6px', // (height - trackHeight)/2
        sliderCheckedTransform: 'translateX(28px)',
      },
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
