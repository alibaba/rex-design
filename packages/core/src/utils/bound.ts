/**
 *
 */
export function bound(position: number, min?: number, max?: number) {
  let ret = position;

  if (min !== undefined) {
    ret = Math.max(position, min);
  }

  if (min !== undefined) {
    return Math.min(ret, max);
  }

  return ret;
}
