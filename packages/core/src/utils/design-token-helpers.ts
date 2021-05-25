import { get, isNil } from 'lodash';
import { StringOrNumber } from '../types';

const hexRegex = /^#[a-fA-F0-9]{3,6}$/;
const rgbRegex = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
const rgbaRegex = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([-+]?[0-9]*[.]?[0-9]+)\s*\)$/i;

function parseToRGB(color: string) {
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

const THEME_TOKEN_PATTERN = /^(colors|fontSizes|lineHeights|borders|radii|shadows|space|sizes|zIndices|components)./;

const CSS_FUNCTION_PATTERN = /^[a-z]+(-[a-z]*)?\(.+\)$/;

type ThemeKeyType =
  | 'colors'
  | 'fontSizes'
  | 'lineHeights'
  | 'borders'
  | 'radii'
  | 'shadows'
  | 'space'
  | 'sizes'
  | 'zIndices'
  | 'components';

/**
 * 是否为有效的 token path
 * @param token
 */
export function isValidTokenPath(token: string) {
  if (THEME_TOKEN_PATTERN.test(token)) {
    return true;
  }
  return false;
}

const tokenPathToVariable = (token: string) => {
  return `var(--rex-${token.split('.').join('-')})`;
};

/**
 * 获取 token 对应的 css variable
 * @param token
 * @param themeKey
 */
export function tokenVar(token: string, themeKey?: ThemeKeyType) {
  if (!token) {
    return;
  }

  if (CSS_FUNCTION_PATTERN.test(token)) {
    return token;
  }

  if (THEME_TOKEN_PATTERN.test(token)) {
    return tokenPathToVariable(token);
  }

  const mergedPath = [themeKey, token].join('.');

  return tokenPathToVariable(mergedPath);
}

/**
 * color token to css variables
 * @param token
 */
export function colors(token: string) {
  if (hexRegex.test(token) || rgbRegex.test(token) || rgbaRegex.test(token)) {
    return token;
  }

  return tokenVar(token, 'colors');
}

/**
 * borders token
 * @param token
 */
export function borders(token: string, color?: string) {
  if (isNil(token)) {
    return;
  }

  if (Number(token) === 0) {
    return 0;
  }

  if (token.split(' ').length > 1) {
    return token;
  }

  const border = tokenVar(token, 'borders');
  const arr = [border];

  if (color) {
    arr.push(colors(color));
  }

  return arr.join(' ');
}

export function shadows(token: string) {
  if (token && token.split(' ').length > 4) {
    return token;
  }

  return tokenVar(token, 'shadows');
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
export function sizes(token: StringOrNumber, themeKey: ThemeKeyType = 'sizes') {
  if (typeof token === 'number') {
    return `${token}px`;
  }

  if (typeof token === 'string' && SIZE_UNIT_VALUE.test(token)) {
    return token;
  }

  // TODO: 哪里这么传了 ???
  if (typeof token === 'string' && token.startsWith('var(')) {
    return token;
  }

  // if (typeof token === 'string') {
  //   return `var(${prefix}-${token.split('.').join('-')})`;
  // }

  return tokenVar(token, themeKey);
}

/**
 * space token to css variables
 * @param token
 */
export function space(token: StringOrNumber) {
  return sizes(token, 'space');
}

/**
 * radii token
 * @param token
 */
export function radii(token: StringOrNumber) {
  return sizes(token, 'radii');
}

/**
 * fontSizes token
 * @param token
 */
export function fontSizes(token?: StringOrNumber) {
  return sizes(token, 'fontSizes');
}

/**
 * 获取组件级的自定义 token variable
 * @param token
 * @example getToken('Button.height')
 * @example getToken('Button.bg')
 */
export function getToken(token: string) {
  return tokenVar(token, 'components');
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
