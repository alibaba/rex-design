import { extendTheme } from '../theme';

export default extendTheme({
  fontSizes: {
    note: '16px',
    body: '18px',

    subtitle: '20px',
    title: '22px',
    subheader: '24px',
    header: '26px',
  },

  sizes: {
    formHeights: {
      s: '41px',
      m: '48px',
      l: '55px',
    },
  },

  components: {
    Button: {
      spx: '14px',
      mpx: '16px',
      lpx: '18px',

      sFontSize: '14px',
      mFontSize: '16px',
      lFontSize: '18px',

      sIconSize: '16px',
      mIconSize: '18px',
      lIconSize: '20px',
    },

    Input: {
      width: '379px',
      elementFontSize: '24px',
    },

    TimePicker: {
      triggerWidth: '200px',
      normalPanelWidth: '200px',
      simplePanelWidth: '200px',
      panelMenuItemHeight: '39px', // 需要保持和日期组件的格子一样大
    },

    DatePicker: {
      triggerWidth: '240px',
      normalTimeCardWidth: '240px',
      simpleTimeCardWidth: '200px',
      monthCardWidth: '260px',
      dateCellSize: '39px',
      dateCellDotSize: '6px',
    },

    DateRangePicker: {
      triggerWidth: '480px',
      startTriggerWidth: '208px',
    },
  },
});
