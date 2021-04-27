import React from 'react';
import styled from 'styled-components';
import { Box } from '../layout';
import { useSteps, UseStepsProps } from './use-steps';
import { Step, ColumnStep } from './step';

const StepsBox = styled(Box)<any>`
  display: flex;
  flex-direction: ${(props) => props.$direction};
  list-style: none;
  margin: 0;
  padding: 0;

  > li:first-child::before {
    display: none;
  }

  > li:last-child::after {
    display: none;
  }

  > li:last-child .rex-step-content {
    border-left-color: transparent;
  }
`;

export interface StepsProps extends UseStepsProps {
  direction?: 'row' | 'column';
}

export function Steps(props: StepsProps) {
  const { direction = 'row' } = props;
  const { items } = useSteps(props);
  const Tag = direction === 'row' ? Step : ColumnStep;

  return (
    <StepsBox as="ol" className="rex-steps" $direction={direction}>
      {items.map((item) => (
        <Tag key={item.step} {...item} />
      ))}
    </StepsBox>
  );
}
