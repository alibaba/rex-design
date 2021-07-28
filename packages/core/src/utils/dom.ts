import { RefObject } from 'react';
import warning from 'tiny-warning';

export function getElementHeight(el: RefObject<HTMLElement> | { current?: { scrollHeight: number } }): string | number {
  if (!el?.current) {
    warning(
      true,
      `useCollapse was not able to find a ref to the collapse element via \`getCollapseProps\`. Ensure that the element exposes its \`ref\` prop. If it exposes the ref prop under a different name (like \`innerRef\`), use the \`refKey\` property to change it. Example:

{...getCollapseProps({refKey: 'innerRef'})}`,
    );
    return 'auto';
  }
  return el.current.scrollHeight;
}
