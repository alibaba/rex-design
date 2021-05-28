import { Anchor } from '@rexd/core';
import _ from 'lodash';
import React from 'react';
import styled from 'styled-components';

export default { title: 'Anchor' };

const repeat = (txt: string, n: number) => {
  return _.range(n).map((i) => (
    <p key={i} style={{ fontSize: 20, padding: 16, margin: 0 }}>
      {txt} {i}
    </p>
  ));
};

const StyledH2 = styled.h2`
  &:target {
    background: #ccc;
    color: red;
  }
`;

const StyledH3 = styled.h3`
  &:target {
    background: #ccc;
    color: red;
  }
`;

export function Basic() {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 'auto' }}>
        {repeat('主题文案', 3)}

        <div>
          <StyledH2 id="s1">1 Section1</StyledH2>
          <StyledH3 id="s1_1">1_1 Section1_1</StyledH3>
          {repeat('LONG CONTENT', 10)}

          <StyledH3 id="s1_2">1_2 Section1_2</StyledH3>
          {repeat('LONG CONTENT', 10)}

          <StyledH3 id="s1_3">1_3 Section1_3</StyledH3>
          {repeat('LONG CONTENT', 10)}
        </div>

        <div>
          <StyledH2 id="s2">2 Section2</StyledH2>
          {repeat('LONG CONTENT', 20)}
        </div>

        <div>
          <StyledH2 id="s3">3 Section3</StyledH2>
          {repeat('LONG CONTENT', 20)}
        </div>
      </div>

      <div style={{ flex: '0 0 140px' }}>
        <Anchor>
          <Anchor.Item title="1 Section" href="#s1">
            <Anchor.Item title="1_1 Section1_1" href="#s1_1" />
            <Anchor.Item title="1_2 Section1_2" href="#s1_2" />
            <Anchor.Item title="1_3 Section1_3" href="#s1_3" />
          </Anchor.Item>
          <Anchor.Item title="2 Section 2" href="#s2" />
          <Anchor.Item title="3 Section 3" href="#s3" />
        </Anchor>
      </div>
    </div>
  );
}
