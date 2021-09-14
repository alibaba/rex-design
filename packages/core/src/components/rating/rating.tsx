import React from 'react';
import { Box } from '../layout';
import styled from 'styled-components';
import { useRating, UseRatingProps } from './use-rating';
import { useControllableState } from '../../hooks';

const RexRating = styled(Box).attrs({ as: 'span' })`
  display: flex;
`;

export interface RatingProps extends UseRatingProps {}

export function Rating(props: RatingProps) {
  const { value: valueProp, defaultValue = 0, onChange, count } = props;

  const [value, updateValue] = useControllableState({
    value: valueProp,
    defaultValue,
    onChange,
  });

  const {} = useRating(props);

  return (
    <RexRating>
      {Array(count).keys.map((index) => {
        <RexRatingItem />;
      })}
    </RexRating>
  );
}
