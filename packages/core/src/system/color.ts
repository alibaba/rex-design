import { system, StylePropConfig } from './core';
import { colors } from '../utils';

const config: StylePropConfig = {
  color: {
    property: 'color',
    scale: 'colors',
    getValue: colors,
  },
  backgroundColor: {
    property: 'backgroundColor',
    scale: 'colors',
    getValue: colors,
  },
  opacity: true,
};

config.bg = config.backgroundColor;

export const color = system(config);
