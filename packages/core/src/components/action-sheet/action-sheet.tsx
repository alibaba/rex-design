import React from 'react';
import { Box } from '../layout';
import { Menu, MenuProps } from '../menu';
import { AdaptivePopup, PopupProps } from '../overlays';

export interface ActionSheetProps {
  /**
   * 面板标题
   */
  title?: string;

  target: PopupProps['target'];

  dataSource?: MenuProps['dataSource'];
  onItemClick?: MenuProps['onItemClick'];
}

export function ActionSheet(props: ActionSheetProps) {
  const { title, target, dataSource = [], onItemClick } = props;

  return (
    <AdaptivePopup
      hasArrow
      target={target}
      renderChildren={(arg: any) => (
        <AdaptivePopup.Panel {...arg}>
          {arg.arrow}
          {title && (
            <Box py="m" textAlign="center" fontSize="body">
              {title}
            </Box>
          )}
          <Menu.Panel boxShadow="none">
            <Menu.Inner autoDismissPopup dataSource={dataSource} onItemClick={onItemClick} />
          </Menu.Panel>
        </AdaptivePopup.Panel>
      )}
    />
  );
}
