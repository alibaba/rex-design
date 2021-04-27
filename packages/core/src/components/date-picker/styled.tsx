import styled from 'styled-components';
import { Box } from '../layout';

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
    padding: 8px 10px;

    &:hover {
      background-color: var(--rex-colors-primary-10);
    }

    &.rex-current {
      color: var(--rex-colors-brand-normal);

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
      color: var(--rex-colors-emphasis-0);
      background-color: var(--rex-colors-brand-normal);
    }
  }
`;

export const TimePanelHeader = styled.div`
  height: 32px;
  line-height: 32px;
  text-align: center;
  font-size: var(--rex-fontSizes-body);
`;

export const DateLinkButton = styled(Box).attrs({
  as: 'button',
  px: 'm',
})`
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
  color: var(--rex-colors-text-body);

  &:hover {
    color: var(--rex-colors-brand-normal);
  }

  svg {
    vertical-align: middle;
  }
`;
