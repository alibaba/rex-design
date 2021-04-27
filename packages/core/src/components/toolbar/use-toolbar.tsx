import { useDevice } from '../../providers';
import { ActionListProps } from '../action-list';
import { BoxProps } from '../layout';

const getMaxNodes = (device: string) => {
  if (device === 'phone') {
    return 2;
  }
  return Infinity;
};

export interface UseToolbarProps extends BoxProps {
  actions?: ActionListProps['actions'];
}

export function useToolbar(props: UseToolbarProps) {
  const { actions: actionsProp = [], ...htmlProps } = props;
  const { device } = useDevice();
  const max = getMaxNodes(device.name);

  let left = actionsProp;
  let more: any[] = [];

  if (actionsProp.length > max) {
    left = actionsProp.slice(0, max);
    more = actionsProp.slice(max, actionsProp.length);
  }

  if (more.length) {
    left.push({
      key: 'more',
      label: '更多',
      children: more,
    });
  }

  // TODO: 根据容器宽度自动判断

  return {
    actions: left,
    htmlProps,
  };
}
