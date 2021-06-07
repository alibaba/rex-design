export const arrayUtils = {
  diff(arr1: string[], arr2: Iterable<string>) {
    const set = new Set(arr2);
    return arr1.filter((x) => !set.has(x));
  },
  merge(arr1: string[], arr2: string[]) {
    const set = new Set(arr1);
    return arr1.concat(arr2.filter((x) => !set.has(x)));
  },
} as const;
