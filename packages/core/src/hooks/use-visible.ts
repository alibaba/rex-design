import { useCallback, useState } from 'react';
import { useControllableProp } from './use-controllable';

export interface UseVisibleProps {
  visible?: boolean;
  defaultVisible?: boolean;
  onClose?(): void;
  onOpen?(): void;
}

export function useVisible(props: UseVisibleProps) {
  const { visible: visibleProp, defaultVisible = false, onClose: onCloseProp, onOpen: onOpenProp } = props;
  const [visibleState, setVisible] = useState(defaultVisible);
  const [isControlled, visible] = useControllableProp(visibleProp, visibleState);

  const onClose = useCallback(() => {
    if (!isControlled) {
      setVisible(false);
    }
    onCloseProp?.();
  }, [isControlled, onCloseProp]);

  const onOpen = useCallback(() => {
    if (!isControlled) {
      setVisible(true);
    }
    onOpenProp?.();
  }, [isControlled, onOpenProp]);

  const onToggle = useCallback(() => {
    const callback = visible ? onClose : onOpen;
    callback();
  }, [visible, onClose, onOpen]);

  return {
    visible,
    onOpen,
    onClose,
    onToggle,
    isControlled,
  };
}
