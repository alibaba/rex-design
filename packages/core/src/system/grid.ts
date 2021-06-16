import { system, StylePropConfig } from './core';
import { space } from '../utils';

const config: StylePropConfig = {
  gridGap: {
    property: 'gridGap',
    scale: 'space',
    getValue: space,
  },
  gridColumnGap: {
    property: 'gridColumnGap',
    scale: 'space',
    getValue: space,
  },
  gridRowGap: {
    property: 'gridRowGap',
    scale: 'space',
    getValue: space,
  },
  gridColumn: true,
  gridRow: true,
  gridAutoFlow: true,
  gridAutoColumns: true,
  gridAutoRows: true,
  gridTemplateColumns: true,
  gridTemplateRows: true,
  gridTemplateAreas: true,
  gridArea: true,
};

export const grid = system(config);
