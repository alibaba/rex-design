import React from 'react';
import cx from 'classnames';

export interface UseRatingProps {
  value?: number;
  defaultValue?: number;
  onChange?: (nextValue: number) => void;
  hasTip?: boolean;
  count?: number;
}

export function useRating(props: UseRatingProps) {
  const clazz = cx('rex-rating');

  const getRootProps = {};

  return {};
}

export interface UseRatingItemProps {
  isActive?: boolean;
  count?: number;
  value: number;
  activeNode?: React.ReactNode;
  inactiveNode?: React.ReactNode;
}

export function useRatingItem(props: UseRatingItemProps) {}
