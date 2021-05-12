import { get } from 'lodash';
import { StringOrNumber } from '../types';
import { isNull } from './assertion';

/**
 * color token to css variables
 * @param token
 */
export function colors(token: string) {
  if (typeof token === 'string' && token.split('.').length > 1) {
    const list = token.split('.');
    list.unshift('--rex', 'colors');
    return `var(${list.join('-')})`;
  }
  return token;
}

/**
 * borders token
 * @param token
 */
export function borders(token: string, color?: string) {
  if (isNull(token)) {
    return;
  }

  if (Number(token) === 0) {
    return 0;
  }

  if (token.split(' ').length > 1) {
    return token;
  }

  const arr = [`var(--rex-borders-${token})`];

  if (color) {
    arr.push(colors(color));
  }

  return arr.join(' ');
}

export function shadows(token: string) {
  if (!token) {
    return;
  }

  if (token.split(' ').length > 4) {
    return token;
  }

  return `var(--rex-shadows-${token})`;
}

/**
 * 正则：匹配是否为有效的单位数值
 * @example
 * 22px, 22.2%, 33vw, 44vh
 */
const SIZE_UNIT_VALUE = /^\d+(\.\d+)?(px|vw|vh|%)$/;

/**
 * sizes token to css variables
 * @param token
 * @param prefix
 */
export function sizes(token: StringOrNumber, prefix = '--rex-sizes') {
  if (typeof token === 'number') {
    return `${token}px`;
  }

  if (typeof token === 'string' && SIZE_UNIT_VALUE.test(token)) {
    return token;
  }

  if (typeof token === 'string' && token.startsWith('var(')) {
    return token;
  }

  if (typeof token === 'string') {
    return `var(${prefix}-${token.split('.').join('-')})`;
  }

  return token;
}

/**
 * space token to css variables
 * @param token
 */
export function space(token: StringOrNumber) {
  return sizes(token, '--rex-space');
}

/**
 * radii token
 * @param token
 */
export function radii(token: StringOrNumber) {
  return sizes(token, '--rex-radii');
}

/**
 * fontSizes token
 * @param token
 */
export function fontSizes(token?: StringOrNumber) {
  return sizes(token, '--rex-fontSizes');
}

const REX_TOKEN_PATTERN = /^([a-zA-Z]+\.)+(\w+\.?)+$/;

/**
 * 是否为有效的 token path
 * @example foo.bar
 *
 * @param token
 */
export function isValidTokenPath(token: string) {
  if (typeof token === 'string' && REX_TOKEN_PATTERN.test(token)) {
    // TODO: check category
    return true;
  }
  return false;
}

/**
 * TODO: rename to getTokenVariable
 * 获取组件级的 token
 * @param token
 */
export function getToken(token: string, category: 'common' | 'components' = 'components') {
  if (isValidTokenPath(token)) {
    let val = token.replace(/\./g, '-');
    if (category === 'components') {
      val = `components-${val}`;
    }
    return `var(--rex-${val})`;
  }

  return token;
}

/**
 * 获取 value 的真实值
 * @param token
 * @param themeObject
 */
export function getTokenValue(token: string, themeObject = {}) {
  let val = token;

  while (isValidTokenPath(val)) {
    val = get(themeObject, val);
  }

  return val;
}

const hexRegex = /^#[a-fA-F0-9]{6}$/;

function parseToRGB(color: string) {
  // const normalizedColor = nameToHex(color);
  if (color.match(hexRegex)) {
    return {
      red: parseInt(`${color[1]}${color[2]}`, 16),
      green: parseInt(`${color[3]}${color[4]}`, 16),
      blue: parseInt(`${color[5]}${color[6]}`, 16),
    };
  }
  throw new Error('color is not a valid hex value');
}

/**
 * background: ${rgba('#ffffff', 0.4)};
 * @param hexColor
 * @param alpha
 */
export function rgba(hexColor: string, alpha: number) {
  const rgbValue = parseToRGB(hexColor);
  return `rgba(${rgbValue.red},${rgbValue.green},${rgbValue.blue},${alpha})`;
}
