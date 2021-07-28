import { CSSProperties, MouseEvent, ReactNode, TransitionEvent } from 'react';

export interface GetTogglePropsOutput {
  disabled: boolean;
  tabIndex: number;
  onClick: (e: MouseEvent) => void;
}

export interface GetTogglePropsInput {
  disabled?: boolean;
  onClick?: (e: MouseEvent) => void;

  [key: string]: unknown;
}

export interface GetCollapsePropsOutput {
  onTransitionEnd: (e: TransitionEvent) => void;
  style: CSSProperties;
}

export interface GetCollapsePropsInput {
  style?: CSSProperties;
  onTransitionEnd?: (e: TransitionEvent) => void;
  refKey?: string;
  ref?: (node: ReactNode) => void | null | undefined;

  [key: string]: unknown;
}

export interface UseCollapseInput {
  isExpanded?: boolean;
  defaultExpanded?: boolean;
  collapsedHeight?: number;
  expandStyles?: {};
  collapseStyles?: {};
  easing?: string;
  duration?: number;
  onCollapseStart?: () => void;
  onCollapseEnd?: () => void;
  onExpandStart?: () => void;
  onExpandEnd?: () => void;
}

export interface UseCollapseOutput {
  getCollapseProps: (config?: GetCollapsePropsInput) => GetCollapsePropsOutput;
  getToggleProps: (config?: GetTogglePropsInput) => GetTogglePropsOutput;
  isExpanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}
