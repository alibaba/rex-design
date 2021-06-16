import { system, StylePropConfig } from './core';
import { shadows } from '../utils';

const config: StylePropConfig = {
  boxShadow: {
    property: 'boxShadow',
    scale: 'shadows',
    getValue: shadows,
  },
  textShadow: {
    property: 'textShadow',
    scale: 'shadows',
    getValue: shadows,
  },
};

export const shadow = system(config);
