import styled from 'styled-components';
import { getToken } from '../../utils';

export const DateList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  user-select: none;
  padding: 0;
  margin: 0;
  font-size: var(--rex-fontSizes-body);
  text-align: center;

  > li {
    position: relative;
    flex-basis: 33.33%;
    height: ${getToken('DatePicker.dateCellSize')};
    line-height: ${getToken('DatePicker.dateCellSize')};

    &:hover {
      border-radius: var(--rex-radii-s);
      background-color: var(--rex-colors-emphasis-10);
    }

    &.rex-current {
      &::after {
        content: ' ';
        position: absolute;
        left: 50%;
        top: 80%;
        transform: translateX(-50%);
        width: ${getToken('DatePicker.dateCellDotSize')};
        height: ${getToken('DatePicker.dateCellDotSize')};
        border-radius: 100%;
        background-color: var(--rex-colors-secondary-50);
      }
    }

    &.rex-active {
      color: var(--rex-colors-brand-normal);
    }
  }
`;

export const TimePanelHeader = styled.div`
  height: 32px;
  line-height: 32px;
  text-align: center;
  font-size: var(--rex-fontSizes-body);
`;

export const StyledTable = styled.div`
  user-select: none;
  font-size: var(--rex-fontSizes-body);
  color: var(--rex-colors-text-body);
`;

export const StyledRow = styled.div`
  display: flex;
  justify-content: center;

  .rex-inRange:first-child {
    border-top-left-radius: var(--rex-radii-s);
    border-bottom-left-radius: var(--rex-radii-s);
  }

  .rex-inRange:last-child {
    border-top-right-radius: var(--rex-radii-s);
    border-bottom-right-radius: var(--rex-radii-s);
  }
`;

export const StyledHeadCell = styled.div``;

export const StyledCell = styled.div`
  margin-top: 2px;
  margin-bottom: 2px;
  position: relative;

  &:not(.rex-inRange):hover {
    border-radius: var(--rex-radii-s);
    background-color: var(--rex-colors-emphasis-10);
  }

  &.rex-today {
    &::after {
      content: ' ';
      position: absolute;
      bottom: 2px;
      left: 50%;
      transform: translateX(-50%);
      width: ${getToken('DatePicker.dateCellDotSize')};
      height: ${getToken('DatePicker.dateCellDotSize')};
      border-radius: 100%;
      background-color: var(--rex-colors-secondary-50);
    }
  }

  &.rex-inRange {
    background-color: ${getToken('DatePicker.dateCellInRangeBg')};
  }

  &.rex-inRange:not(.rex-active):hover > div {
    border-radius: var(--rex-radii-s);
    background-color: ${getToken('DatePicker.dateCellInRangeBgHover')};
  }

  &.rex-otherMonth {
    color: var(--rex-colors-text-note);
  }

  &.rex-active > div {
    color: ${getToken('DatePicker.dateCellActiveColor')};
    background-color: ${getToken('DatePicker.dateCellActiveBg')};
    border-radius: var(--rex-radii-s);
  }

  &.rex-startValue {
    border-top-left-radius: var(--rex-radii-s);
    border-bottom-left-radius: var(--rex-radii-s);
  }

  &.rex-endValue {
    border-top-right-radius: var(--rex-radii-s);
    border-bottom-right-radius: var(--rex-radii-s);
  }

  &.rex-active.rex-today::after {
    background-color: ${getToken('DatePicker.dateCellActiveColor')};
  }

  &.rex-disabled {
    color: var(--rex-colors-text-disabled);
    pointer-events: none;
  }
`;

export const StyledCellContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${getToken('DatePicker.dateCellSize')};
  width: ${getToken('DatePicker.dateCellSize')};
`;
