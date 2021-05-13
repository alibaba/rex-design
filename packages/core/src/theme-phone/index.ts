import { math } from 'polished';
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
    Button: {
      spx: '12px',
      mpx: '14px',
      lpx: '16px',

      sFontSize: '13px',
      mFontSize: '14px',
      lFontSize: '16px',

      // iconSize = fontSize * lineHeight
      sIconSize: math('13px * 1.5'),
      mIconSize: math('14px * 1.5'),
      lIconSize: math('16px * 1.5'),
    },

    Input: {
      width: '100%',
      elementFontSize: '16px',
    },

    TimePicker: {
      triggerWidth: '100%',
      normalPanelWidth: '90vw',
      simplePanelWidth: '90vw',
      panelMenuItemHeight: '40px', // 需要保持和日期组件的格子一样大
    },

    DatePicker: {
      triggerWidth: '100%',
      normalTimeCardWidth: '90vw',
      simpleTimeCardWidth: '90vw',
      monthCardWidth: '90vw',
      dateCellSize: '40px',
      dateCellDotSize: '6px',
    },

    DateRangePicker: {
      triggerWidth: '100%',
      startTriggerWidth: '45%',
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
