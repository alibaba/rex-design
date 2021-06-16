import { system, StylePropConfig } from './core';
import { space } from '../utils';

const config: StylePropConfig = {
  position: true,
  zIndex: {
    property: 'zIndex',
    scale: 'zIndices',
  },
  top: {
    property: 'top',
    scale: 'space',
    getValue: space,
  },
  right: {
    property: 'right',
    scale: 'space',
    getValue: space,
  },
  bottom: {
    property: 'bottom',
    scale: 'space',
    getValue: space,
  },
  left: {
    property: 'left',
    scale: 'space',
    getValue: space,
  },
};

export const position = system(config);
