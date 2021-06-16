import { system, StylePropConfig } from './core';
import { sizes } from '../utils';

const config: StylePropConfig = {
  display: true,
  overflow: true,
  overflowX: true,
  overflowY: true,
  verticalAlign: true,
  width: {
    property: 'width',
    scale: 'sizes',
    getValue: sizes,
  },
  height: {
    property: 'height',
    scale: 'sizes',
    getValue: sizes,
  },
  minWidth: {
    property: 'minWidth',
    scale: 'sizes',
    getValue: sizes,
  },
  minHeight: {
    property: 'minHeight',
    scale: 'sizes',
    getValue: sizes,
  },
  maxWidth: {
    property: 'maxWidth',
    scale: 'sizes',
    getValue: sizes,
  },
  maxHeight: {
    property: 'maxHeight',
    scale: 'sizes',
    getValue: sizes,
  },
  size: {
    properties: ['width', 'height'],
    scale: 'sizes',
    getValue: sizes,
  },
};

export const layout = system(config);
