import { get, hasIn, isNil } from 'lodash';
import { THEMES } from '../theme';
import { StringOrNumber, SystemScaleType } from '../types';

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
  if (!hexColor) {
    return;
  }

  const rgbValue = parseToRGB(hexColor);
  return `rgba(${rgbValue.red},${rgbValue.green},${rgbValue.blue},${alpha})`;
}

const THEME_TOKEN_PATTERN = /^(colors|fontSizes|lineHeights|borders|radii|shadows|space|sizes|zIndices|components)./;

const CSS_FUNCTION_PATTERN = /^[a-z]+(-[a-z]*)?\(.+\)$/;

/**
 * 是否为有效的 token path
 * @param token
 */
export function isValidTokenPath(token: string) {
  if (token && THEME_TOKEN_PATTERN.test(token)) {
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
 * @param scale 对应主题中的子类别
 */
export function tokenVar(token: string, scale?: SystemScaleType) {
  if (!token) {
    return;
  }

  // 优先检查符合 tokenPath 规范，符合规范的直接转换，不检查有效性
  if (isValidTokenPath(token)) {
    return tokenPathToVariable(token);
  }

  // 再检查是不是 css function，如果是，直接返回
  if (CSS_FUNCTION_PATTERN.test(token)) {
    return token;
  }

  // 最后尝试加入 scale 在 theme 中寻找
  if (scale) {
    const themedToken = [scale, token].join('.');
    // TODO: 无法解析到扩展的 theme，最好的做法是放到 ThemeProvider 里找
    if (hasIn(THEMES.base, themedToken)) {
      return tokenPathToVariable(themedToken);
    }
  }

  // 不符合条件的直接返回
  return token;
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
export function borders(token: string) {
  if (isNil(token)) {
    return;
  }

  if (Number(token) === 0) {
    return 0;
  }

  if (token.split(' ').length > 1) {
    return token;
  }

  return tokenVar(token, 'borders');
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
 * @param scale
 */
export function sizes(token: StringOrNumber, scale: SystemScaleType = 'sizes') {
  if (typeof token === 'number') {
    return `${token}px`;
  }

  if (typeof token === 'string' && SIZE_UNIT_VALUE.test(token)) {
    return token;
  }

  return tokenVar(token, scale);
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
