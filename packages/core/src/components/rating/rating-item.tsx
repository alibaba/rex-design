import React from 'react';
import styled from 'styled-components';
import { Box } from '../layout';
import { SvgFavorite, SvgFavoriteFilling } from '@rexd/icon';

const RexRatingItem = styled(Box)``;

export interface RatingItemProps {
  isActive: boolean;
  itemValue: number;
}

/**
 * <SvgIcon type="fabulous" />
 * <SvgIcon type="" />
 */

export function RatingItem(props: RatingItemProps) {
  const { isActive } = props;

  return (
    <RexRatingItem>
      <SvgFavorite />
      <SvgFavoriteFilling />
    </RexRatingItem>
  );
}
