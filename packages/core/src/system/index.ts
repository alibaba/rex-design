import memoize from '@emotion/memoize';
import isPropValid from '@emotion/is-prop-valid';
import { compose } from './core';
import { layout } from './layout';
import { typography } from './typography';
import { flexbox } from './flexbox';
import { grid } from './grid';
import { position } from './position';
import { color } from './color';
import { border } from './border';
import { space } from './space';
import { shadow } from './shadows';

const createShouldForwardProp = (props: string[]) => {
  const regex = new RegExp(`^(${props.join('|')})$`);
  return memoize((prop) => isPropValid(prop) && !regex.test(prop));
};

export const allStyledProps = compose(layout, typography, flexbox, grid, position, color, border, space, shadow);

export const textStyledProps = compose(typography, color);

export const allStyledPropNames = allStyledProps.propNames;

export const shouldForwardProp = createShouldForwardProp(allStyledPropNames);

export * from './core';
export * from './layout';
export * from './typography';
export * from './flexbox';
export * from './grid';
export * from './position';
export * from './color';
export * from './border';
export * from './space';
export * from './shadows';
