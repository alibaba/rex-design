export function withCache<T>(generate: () => T) {
  let cache: T | null = null;
  return () => {
    // NOT ===
    if (cache == null) {
      cache = generate();
    }
    return cache;
  };
}
