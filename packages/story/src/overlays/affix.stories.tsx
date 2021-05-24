import { Affix } from '@rexd/core';
import _ from 'lodash';
import React from 'react';
import styled from 'styled-components';

export default { title: 'overlays / Affix' };

const StyledDiv = styled.div`
  width: 100%;
  padding: 10px;
  font-size: 12px;
  background: var(--rex-colors-emphasis-10);
  box-shadow: var(--rex-shadows-lowDown);
`;

function BalaBala({ text }: { text?: string }) {
  return (
    <StyledDiv>
      <h1 style={{ margin: 0 }}>
        <code>{text}</code>
      </h1>
      最近工作：高级经理｜招商银行
      <br />
      工作职责：巴拉巴拉小魔仙
      <br />
      联系方式：67676767
    </StyledDiv>
  );
}

const repeat = (txt: string, n: number) => {
  return _.range(n).map((i) => (
    <p key={i} style={{ fontSize: 20, padding: 16, margin: 0 }}>
      {txt} {i}
    </p>
  ));
};

export function BasicAffixTop() {
  return (
    <div>
      {repeat('TOP CONTENT', 3)}

      <div style={{ display: 'flex' }}>
        <div style={{ flex: '0 0 70%', background: '#f2f2f2' }}>{repeat('LONG CONTENT', 50)}</div>
        <div style={{ flex: '0 0 30%', background: '#ffebeb' }}>
          <Affix offsetTop={10}>
            <BalaBala text="offsetTop=10" />
          </Affix>
        </div>
      </div>
    </div>
  );
}

export function BasicAffixBottom() {
  return (
    <div>
      {repeat('TOP CONTENT', 3)}

      <div style={{ display: 'flex' }}>
        <div style={{ flex: '0 0 70%', background: '#f2f2f2' }}>{repeat('LONG CONTENT', 20)}</div>
        <div style={{ flex: '0 0 30%', background: '#ffebeb', display: 'flex', alignItems: 'flex-end' }}>
          <Affix offsetBottom={20}>
            <BalaBala text="offsetBottom={20}" />
          </Affix>
        </div>
      </div>

      <div style={{ flex: '0 0 70%', background: '#b3b1f1' }}>{repeat('BOTTOM CONTENT', 20)}</div>
    </div>
  );
}

export function AffixTopInContainer() {
  return (
    <div>
      {repeat('OUTER TOP CONTENT', 5)}

      <div style={{ height: 400, overflow: 'auto', background: '#d9e6ff' }}>
        <div style={{ height: 100, background: '#d2fcc9' }} />

        <Affix offsetTop={10}>
          <BalaBala text="offsetTop={10}" />
        </Affix>

        <div style={{ height: 600, background: '#fcc9fb' }} />
      </div>

      {repeat('OUTER BOTTOM CONTENT', 15)}
    </div>
  );
}

export function AffixBottomInContainer() {
  return (
    <div>
      {repeat('OUTER TOP CONTENT', 5)}

      <div style={{ height: 400, overflow: 'auto', background: '#d9e6ff' }}>
        <div style={{ height: 600, background: '#d2fcc9' }} />

        <Affix offsetBottom={10}>
          <BalaBala text="offsetBottom={10}" />
        </Affix>

        <div style={{ height: 400, background: '#fcc9fb' }} />
      </div>

      {repeat('OUTER BOTTOM CONTENT', 15)}
    </div>
  );
}
