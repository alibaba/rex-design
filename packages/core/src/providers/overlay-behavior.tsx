import * as React from 'react';
import { useContext } from 'react';

export const DOCUMENT_BODY = 'DOCUMENT_BODY' as const;

export interface OverlayBehaviorContextType {
  portalContainer: HTMLElement | typeof DOCUMENT_BODY;
}

export const OverlayBehaviorContext = React.createContext<OverlayBehaviorContextType>({
  // portalContainer 默认为 document.body
  // 但这里我们不直接写 document.body，而是用 DOCUMENT_BODY 来进行表示
  // 避免过早读取 DOM API 导致 SSR 报错
  portalContainer: DOCUMENT_BODY,
});

export function useOverlayBehavior() {
  return useContext(OverlayBehaviorContext);
}

export function OverlayBehaviorProvider({
  children,
  ...value
}: OverlayBehaviorContextType & { children: React.ReactNode }) {
  return <OverlayBehaviorContext.Provider value={value}>{children}</OverlayBehaviorContext.Provider>;
}
