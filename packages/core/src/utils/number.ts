export function toNumber(value: any) {
  const num = parseFloat(value);
  return isNaN(num) ? 0 : num;
}

export function toPrecision(value: number, precision?: number) {
  const nextValue = toNumber(value);
  return precision ? toNumber(nextValue.toFixed(precision)) : nextValue;
}

export function toPercent(value: number) {
  return `${value * 100}%`;
}
