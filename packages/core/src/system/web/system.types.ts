import * as React from 'react';
import {
  SpaceProps,
  ColorProps,
  TypographyProps,
  LayoutProps,
  FlexboxProps,
  GridProps,
  BackgroundProps,
  BorderProps,
  PositionProps,
  ShadowProps,
} from 'styled-system';
import { Dict } from '../../types';
import { Pseudos } from '../system.utils';

export interface SystemProps
  extends SpaceProps,
    ColorProps,
    TypographyProps,
    LayoutProps,
    FlexboxProps,
    GridProps,
    BackgroundProps,
    BorderProps,
    PositionProps,
    ShadowProps {
  as?: string;
  forwardedAs?: string;
  theme?: unknown; // TODO theme 的类型需要明确
  colorMode?: 'light' | 'dark';
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export type StyledSystemObject = {
  [k in keyof SystemProps]?: any;
};

export type PseudoStyleObject = {
  [k in keyof Pseudos]?: StyledSystemObject;
};

export type SystemStyleObject =
  | StyledSystemObject
  | PseudoStyleObject
  | {
      _css?: any;
    };

// TODO: 已废弃，使用 SystemProps 进行替换
/** @deprecated */
export interface HippoProps extends SystemProps {}

export type As = React.ElementType<any>;

export type PropsOf<T extends As> = React.ComponentProps<T>;

export type WithAs<P, T extends As> = P &
  Omit<PropsOf<T>, 'as' | keyof P> & {
    as?: T;
  };

export type WithHippo<P> = any;

type RegularComponent<T extends As, P> = (
  props: WithHippo<Omit<PropsOf<T>, 'size' | 'as' | keyof P>> & P & { as?: As },
) => JSX.Element;

type ExtensibleComponent<T extends As, P> = <TT extends As = T>(
  props: WithHippo<WithAs<PropsOf<T>, TT>> & P,
) => JSX.Element;

type Comp<T extends As, P> = RegularComponent<T, P> | ExtensibleComponent<T, P>;

export type HippoComponent<T extends As, P extends Dict = {}> = Comp<T, P> & {
  displayName?: string;
  propTypes?: React.WeakValidationMap<Omit<PropsOf<T>, 'size'> & P>;
  defaultProps?: Partial<Omit<PropsOf<T>, 'size'> & P & HippoProps>;
};
