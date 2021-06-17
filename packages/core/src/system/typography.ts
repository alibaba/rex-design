import { system } from './core';

const config = {
  fontFamily: true,
  fontStyle: true,
  letterSpacing: true,
  textAlign: true,

  fontSize: {
    property: 'fontSize',
    scale: 'fontSizes',
  },
  fontWeight: {
    property: 'fontWeight',
    scale: 'fontWeights',
  },
  lineHeight: {
    property: 'lineHeight',
    scale: 'lineHeights',
  },
};

export const typography = system(config);
