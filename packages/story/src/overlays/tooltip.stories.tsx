import { Button, PopupPlacement, Tooltip } from '@rexd/core';
import { styled } from '@storybook/theming';
import React, { useState } from 'react';

export default { title: 'overlays / Tooltip' };

export function Basic() {
  return (
    <Tooltip trigger={<Button>hover me</Button>}>
      <div style={{ maxWidth: 200 }}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias quas nisi maiores odio nihil modi accusantium
        inventore minus est ipsa natus pariatur, cumque, facilis minima. Consequatur ratione voluptas earum eveniet!
      </div>
    </Tooltip>
  );
}

const ButtonGrid = styled.div`
  margin: 100px;
  display: grid;
  grid: repeat(5, 40px) / repeat(5, auto);
  gap: 8px;
  justify-content: center;
  align-items: center;
`;

const TooltipContent = () => <div style={{ width: 200, height: 100 }}>tooltip content</div>;

export function Placements() {
  const renderButtons = (
    placements: PopupPlacement[],
    getStyle: (index: number) => { gridRow: number; gridColumn: number },
  ) => {
    return placements.map((placement, index) => (
      <Tooltip
        key={placement}
        flip={false}
        renderTrigger={(pass) => (
          <Button {...pass} style={getStyle(index)}>
            {placement}
          </Button>
        )}
        placement={placement}
      >
        <TooltipContent />
      </Tooltip>
    ));
  };

  return (
    <ButtonGrid>
      {renderButtons(['top-end', 'top', 'top-start'], (index) => ({
        gridRow: 1,
        gridColumn: index + 2,
      }))}

      {renderButtons(['left-end', 'left', 'left-start'], (index) => ({
        gridColumn: 1,
        gridRow: index + 2,
      }))}

      {renderButtons(['right-end', 'right', 'right-start'], (index) => ({
        gridColumn: 5,
        gridRow: index + 2,
      }))}

      {renderButtons(['bottom-end', 'bottom', 'bottom-start'], (index) => ({
        gridRow: 5,
        gridColumn: index + 2,
      }))}
    </ButtonGrid>
  );
}

export function Controlled() {
  const [visible, setVisible] = useState(false);

  return (
    <Tooltip
      visible={visible}
      triggerType="click"
      onRequestClose={() => setVisible(false)}
      trigger={<Button onClick={() => setVisible(!visible)}>点击弹出提示信息</Button>}
    >
      <TooltipContent />
    </Tooltip>
  );
}
