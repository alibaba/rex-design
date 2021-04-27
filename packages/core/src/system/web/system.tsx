import styled from 'styled-components';
import {
  background,
  border,
  color,
  compose,
  flexbox,
  grid,
  layout,
  position,
  shadow,
  space,
  typography,
} from 'styled-system';
import { HippoComponent, As } from './system.types';
import { domElements } from '../system.utils';
import theme from '../../theme';

const allStyleProps = compose(space, color, typography, layout, flexbox, grid, background, border, position, shadow);

// const dataPropsMapper = (whiteList: string[] = []) => {
//   return (props: Dict) => {
//     const _clone = {
//       ...props,
//     };

//     // TODO: 这里有 bug，不应该把所有的属性传递下去，建议废弃这个 mapper
//     whiteList.forEach((key) => {
//       if (key in props) {
//         _clone[`data-${key}`] = props[key];
//       }
//     });

//     return _clone;
//   };
// };

// const propsMapper = () => (props: SystemProps) => {
//   ['bg', 'backgroundColor', 'color', 'borderColor'].forEach((prop) => {
//     // TODO: isToken
//     if (props[prop] && !props[prop].startsWith('#')) {
//       props[prop] = `${props.theme.config.colorMode}.${props[prop]}`;
//     }
//   });

//   return props;
// };

/**
 * 构造 system component
 * @param component HTML Element 或 React 组件
 * @param styles 样式
 */
function _system<T extends As, P>(component: T, styles?: any) {
  // TODO: 去掉 styled system，实现一个轻量级版本
  const StyledComponent: any = styled(component)`
    ${styles};
    ${allStyleProps};
  `;

  StyledComponent.defaultProps = {
    theme,
    colorMode: 'light',
  };

  return StyledComponent as HippoComponent<T, P>;
}

// todo system.xxx 报错太多了…
export const system = _system;

domElements.forEach((tag) => {
  const element = system(tag, null);
  system[tag] = element;
});
