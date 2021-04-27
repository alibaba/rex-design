import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  height: 400px;
  border: 2px solid #ccc;
  position: relative;
  display: grid;
  grid: repeat(3, 1fr) / repeat(3, 1fr);

  .h-line {
    position: absolute;
    top: calc(50% - 1px);
    height: 2px;
    width: 100%;
    border-top: #aaa dashed 2px;
  }

  .v-line {
    position: absolute;
    left: calc(50% - 1px);
    width: 2px;
    height: 100%;
    border-left: #aaa dashed 2px;
  }

  .placement {
    display: flex;
    align-items: center;
    justify-content: center;

    > * {
      width: 75%;
      height: 75%;
      border-radius: 6px;
      font-weight: bold;
      padding: 8px;

      code {
        font-size: 14px;
      }
    }
  }
`;

export function App() {
  return (
    <div style={{ paddingTop: '1rem', marginBottom: '1rem' }}>
      <StyledDiv>
        <span style={{ position: 'absolute', top: '-1rem', left: 8 }}>
          <code>container</code>
        </span>
        <div className="h-line" />
        <div className="v-line" />

        {['top-left', 'top', 'top-right', 'left', 'center', 'right', 'bottom-left', 'bottom', 'bottom-right'].map(
          (placement) => (
            <div className="placement" key={placement}>
              <div style={{ background: '#d2d2d2' }}>
                <code>{placement}</code>
              </div>
            </div>
          ),
        )}
      </StyledDiv>
    </div>
  );
}
