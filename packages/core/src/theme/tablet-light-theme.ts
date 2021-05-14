import { math } from 'polished';
import { base } from './base';
import { extendTheme } from './theme-utils';

export const tabletLightTheme = extendTheme(base, {
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

      // iconSize = fontSize * lineHeight
      sIconSize: math('14px * 1.5'),
      mIconSize: math('16px * 1.5'),
      lIconSize: math('18px * 1.5'),
    },

    Input: {
      width: '379px',
      elementFontSize: '24px',
    },

    TimePicker: {
      triggerWidth: '200px',
      normalPanelWidth: '574px',
      simplePanelWidth: '574px',
      panelMenuItemHeight: '39px', // 需要保持和日期组件的格子一样大
    },

    DatePicker: {
      triggerWidth: '264px',
      normalTimeCardWidth: '240px',
      simpleTimeCardWidth: '200px',
      monthCardWidth: '574px',
      dateCellSize: '39px',
      dateCellDotSize: '6px',
    },

    DateRangePicker: {
      triggerWidth: '490px',
      startTriggerWidth: '208px',
    },
  },
});
