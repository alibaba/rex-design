// fixme Date.now() 多次被同步调用时，会返回同一个毫秒数
export function useId(prefix?: string) {
  return prefix ? `${prefix}-${Date.now().toString(36)}` : Date.now().toString(36);
}
