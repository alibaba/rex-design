// 12px -> 12
export const getPxValue = (val: string) => {
  if (typeof val === 'number') {
    return val;
  }

  if (!val) {
    return 0;
  }

  const match = /^(\d+)px$/.exec(val);
  if (match && match.length) {
    return Number(match[1]);
  }

  return 0;
};

// 12 -> 12px;
export const toPxValue = (val: number) => {
  return `${val}px`;
};
