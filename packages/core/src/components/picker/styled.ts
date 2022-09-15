import styled from 'styled-components';
import { Box } from '../layout/index';
import { getToken } from '../../utils/index';

export const classPrefix = `rex-picker-view`;

export const PickerViewContainer = styled(Box)`
  --height: 240px;
  height: var(--height);
  width: 100%;
  display: flex;
  position: relative;
  overflow: hidden;
  background: var(--adm-color-background);
`;

export const PickerViewMask = styled(Box)`
  position: absolute;
  z-index: 10000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  pointer-events: none;
  > .${classPrefix}-mask-top, > .${classPrefix}-mask-bottom {
    flex: auto;
  }
  > .${classPrefix}-mask-middle {
    height: ${getToken('TimePicker.panelMenuItemHeight')};
    box-sizing: border-box;
    flex: none;
    border-top: solid 1px var(--rex-colors-emphasis-20);
    border-bottom: solid 1px var(--rex-colors-emphasis-20);
  }
  > .${classPrefix}-mask-top {
    background: var(--rex-components-TimePicker-listStartMaskBg);
  }
  > .${classPrefix}-mask-bottom {
    background: var(--rex-components-TimePicker-listEndMaskBg);
  }
`;

export const ScrollWheelWrapper = styled(Box)`
  flex: 1;
  height: 100%;
  position: relative;
  text-align: center;
  user-select: none;
  color: var(--rex-colors-text-body);

  .${classPrefix}-column-wheel {
    touch-action: none;
    width: 100%;
    cursor: grab;
    position: absolute;
    top: calc(50% - ${getToken('TimePicker.panelMenuItemHeight')} / 2);
    left: 0;
    &::before {
      content: ' ';
      display: block;
      position: absolute;
      width: 100%;
      height: 100vh;
      top: -100vh;
    }
    &::after {
      content: ' ';
      display: block;
      position: absolute;
      width: 100%;
      height: 100vh;
      bottom: -100vh;
    }
  }
`;

export const ScrollWheelItem = styled(Box)`
  padding: 0 6px;
  height: ${getToken('TimePicker.panelMenuItemHeight')};
  display: flex;
  justify-content: center;
  align-items: center;
  &-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
