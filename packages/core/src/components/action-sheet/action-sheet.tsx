import React from 'react';
import { Box } from '../layout';
import { Menu, MenuProps } from '../menu';
import { AdaptivePopup, PopupProps } from '../overlays';

export interface ActionSheetProps {
  /**
   * 面板标题
   */
  title?: string;
  target?: PopupProps['target'];
  renderTarget?: PopupProps['renderTarget'];
  /**
   * 菜单列表
   */
  dataSource?: MenuProps['dataSource'];
  /**
   * 点击列表项时的回调
   */
  onItemClick?: MenuProps['onItemClick'];
}

export function ActionSheet(props: ActionSheetProps) {
  const { title, target, renderTarget, dataSource = [], onItemClick, ...rest } = props;

  return (
    <AdaptivePopup
      hasArrow
      target={target}
      renderTarget={renderTarget}
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
      {...rest}
    />
  );
}
