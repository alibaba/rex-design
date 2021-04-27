import { PositionOffset, PositionPlacement } from '@rexd/core';

export function getNextPlacement(p: PositionPlacement): PositionPlacement {
  const array: PositionPlacement[] = [
    'center',
    'top-left',
    'top',
    'top-right',
    'left',
    'right',
    'bottom-left',
    'bottom',
    'bottom-right',
  ];
  return array[(array.indexOf(p) + 1) % array.length];
}

export function getDialogOffsetFromPlacement(placement: PositionPlacement): PositionOffset {
  return [
    placement.includes('left') ? 16 : placement.includes('right') ? -16 : 0,
    placement.includes('top') ? 16 : placement.includes('bottom') ? -16 : 0,
  ];
}
