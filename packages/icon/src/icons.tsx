import React from 'react';
import * as icons from './components';
import { IconType, iconTypes as ICON_TYPE_LIST } from './types';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  type: IconType;
}

export const Icon = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { type, ...svgProps } = props;
  const comp = icons[`Svg${camelize(type)}`];

  if (typeof comp !== 'undefined') {
    return React.createElement(comp, {
      ...svgProps,
      ref,
    });
  }
});

export { ICON_TYPE_LIST, IconType };

/**
 * 中划线命名转大驼峰命名
 * eg: zoom-in => ZoomIn
 */
function camelize(string: string) {
  if (!string) {
    return string;
  }

  string = string
    .replace(/[\d]+/g, (match) => {
      return `${match}-`;
    })
    .replace(/[\-_\s]+(.)?/g, (match, chr) => {
      return chr ? chr.toUpperCase() : '';
    });

  return string.substr(0, 1).toUpperCase() + string.substr(1);
}
