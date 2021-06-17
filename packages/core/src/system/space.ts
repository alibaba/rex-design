import { system, StylePropConfig } from './core';

const configs: StylePropConfig = {
  margin: {
    property: 'margin',
    scale: 'space',
  },
  marginTop: {
    property: 'marginTop',
    scale: 'space',
  },
  marginRight: {
    property: 'marginRight',
    scale: 'space',
  },
  marginBottom: {
    property: 'marginBottom',
    scale: 'space',
  },
  marginLeft: {
    property: 'marginLeft',
    scale: 'space',
  },
  marginX: {
    properties: ['marginLeft', 'marginRight'],
    scale: 'space',
  },
  marginY: {
    properties: ['marginTop', 'marginBottom'],
    scale: 'space',
  },
  padding: {
    property: 'padding',
    scale: 'space',
  },
  paddingTop: {
    property: 'paddingTop',
    scale: 'space',
  },
  paddingRight: {
    property: 'paddingRight',
    scale: 'space',
  },
  paddingBottom: {
    property: 'paddingBottom',
    scale: 'space',
  },
  paddingLeft: {
    property: 'paddingLeft',
    scale: 'space',
  },
  paddingX: {
    properties: ['paddingLeft', 'paddingRight'],
    scale: 'space',
  },
  paddingY: {
    properties: ['paddingTop', 'paddingBottom'],
    scale: 'space',
  },
};

configs.m = configs.margin;
configs.mt = configs.marginTop;
configs.mr = configs.marginRight;
configs.mb = configs.marginBottom;
configs.ml = configs.marginLeft;
configs.mx = configs.marginX;
configs.my = configs.marginY;

configs.p = configs.padding;
configs.pt = configs.paddingTop;
configs.pr = configs.paddingRight;
configs.pb = configs.paddingBottom;
configs.pl = configs.paddingLeft;
configs.px = configs.paddingX;
configs.py = configs.paddingY;

export const space = system(configs);
