// import css from '@styled-system/css';
// import { camelToKebab } from '../utils';
import { UnionStringArray } from '../types';

const pseudoSelectors = {
  _hover: '&:hover, &[data-hover], &[data-state=hover]',
  _active: '&:active, &[data-active]',
  _focus: '&:focus, &[data-focus]',
  _disabled: '&[disabled], &[data-disabled]',
  _readOnly: '&[aria-readonly=true], &[readonly], &[data-readonly]',
  _before: '&::before',
  _after: '&::after',
  _hidden: '&[hidden], &[data-hidden]',
  _selected: '&[aria-selected=true], &[data-selected]',
  _first: '&:first-of-type',
  _last: '&:last-of-type',
  _notFirst: '&:not(:first-of-type)',
  _notLast: '&:not(:last-of-type)',
  _placeholder: '&::placeholder',
};

export type Pseudos = typeof pseudoSelectors;

const SELECTOR_PT = /^&\s/;

/**
 * 伪元素 props 或自定义 selector
 * @param props
 */
// export function pseudoProps(props: any): string {
//   let result = '';

//   for (const prop in props) {
//     if (pseudoSelectors[prop] || SELECTOR_PT.test(prop)) {
//       const obj = css(props[prop])(props.theme);
//       console.log(obj);
//       const selector = pseudoSelectors[prop] || prop;
//       result += `${selector} { ${Object.keys(obj).reduce(
//         (prev, cur) => prev + '\n' + camelToKebab(cur) + ':' + obj[cur] + ';',
//         ''
//       )} }`;
//     }
//   }

//   return result;
// }

/**
 * 支持自定义的样式注入
 * @param props
 */
export function cssProps(props: any): string {
  let result = '';

  if (props._css) {
    result = props._css;
  }

  return result;
}

export const domElements = [
  'a',
  'article',
  'aside',
  'blockquote',
  'button',
  'caption',
  'cite',
  'circle',
  'code',
  'dd',
  'div',
  'dl',
  'dt',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'header',
  'hr',
  'img',
  'input',
  'kbd',
  'label',
  'li',
  'mark',
  'nav',
  'ol',
  'p',
  'path',
  'pre',
  'q',
  'rect',
  's',
  'svg',
  'section',
  'select',
  'small',
  'span',
  'sub',
  'sup',
  'table',
  'tbody',
  'td',
  'textarea',
  'tfoot',
  'th',
  'thead',
  'tr',
  'ul',
] as const;

export type DOMElements = UnionStringArray<typeof domElements>;
