import { system, StylePropConfig } from './core';
import { space as getValue } from '../utils';

const configs: StylePropConfig = {
  margin: {
    property: 'margin',
    scale: 'space',
    getValue,
  },
  marginTop: {
    property: 'marginTop',
    scale: 'space',
    getValue,
  },
  marginRight: {
    property: 'marginRight',
    scale: 'space',
    getValue,
  },
  marginBottom: {
    property: 'marginBottom',
    scale: 'space',
    getValue,
  },
  marginLeft: {
    property: 'marginLeft',
    scale: 'space',
    getValue,
  },
  marginX: {
    properties: ['marginLeft', 'marginRight'],
    scale: 'space',
    getValue,
  },
  marginY: {
    properties: ['marginTop', 'marginBottom'],
    scale: 'space',
    getValue,
  },
  padding: {
    property: 'padding',
    scale: 'space',
    getValue,
  },
  paddingTop: {
    property: 'paddingTop',
    scale: 'space',
    getValue,
  },
  paddingRight: {
    property: 'paddingRight',
    scale: 'space',
    getValue,
  },
  paddingBottom: {
    property: 'paddingBottom',
    scale: 'space',
    getValue,
  },
  paddingLeft: {
    property: 'paddingLeft',
    scale: 'space',
    getValue,
  },
  paddingX: {
    properties: ['paddingLeft', 'paddingRight'],
    scale: 'space',
  },
  paddingY: {
    properties: ['paddingTop', 'paddingBottom'],
    scale: 'space',
    getValue,
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
