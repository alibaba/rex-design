const isPlatformSpecifyProp = (prop: string) => prop.match(/^(ali|wechat|toutiao)-/);

export function filterProps<T>(props: T): T {
  return Object.keys(props).reduce<any>((acc, cur) => {
    const prop = cur;

    if (isPlatformSpecifyProp(prop)) {
      return acc;
    }

    acc[prop] = props[cur];

    return acc;
  }, {});
}
