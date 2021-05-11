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
    padding: 4px 12px;
    margin-bottom: 12px;

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
        width: 4px;
        height: 4px;
        border-radius: 100%;
        background-color: var(--rex-colors-brand-normal);
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

export const DateLinkButton = styled.button<any>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  background-color: transparent;
  border: 0;
  outline: none;
  cursor: pointer;
  vertical-align: middle;
  font-size: var(--rex-fontSizes-body);
  color: ${(props) => (props.$isPrimary ? 'var(--rex-colors-brand-normal)' : 'var(--rex-colors-text-body)')};
  padding: 0 var(--rex-space-s);

  &:hover {
    color: var(--rex-colors-brand-normal);
  }

  svg {
    vertical-align: middle;
  }
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

export const StyledHeadCell = styled.div`
  margin-top: 2px;
  margin-bottom: 2px;
`;

export const StyledCell = styled.div`
  flex: 1;
  margin-top: 2px;
  margin-bottom: 2px;
  position: relative;

  &:hover {
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
      width: 4px;
      height: 4px;
      border-radius: 100%;
      background-color: var(--rex-colors-secondary-50);
    }
  }

  &.rex-inRange {
    background-color: var(--rex-colors-primary-10);
  }

  &.rex-otherMonth {
    color: var(--rex-colors-text-note);
  }

  &.rex-active {
    > div {
      color: var(--rex-colors-emphasis-0);
      background-color: var(--rex-colors-brand-normal);
      border-radius: var(--rex-radii-s);
    }
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
    background-color: #fff;
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
  height: ${getToken('DatePicker.dateCellHeight')};
  width: ${getToken('DatePicker.dateCellHeight')};
`;
