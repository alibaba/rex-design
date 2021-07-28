import { useEffect, useRef } from 'react';

export function useEffectAfterMount(effect: () => void, deps: unknown[]): void {
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    if (effect) return effect();
  }, deps);
}
