import React from 'react';
import { useVisible } from '../../hooks';
import { useDevice } from '../../providers';
import { callAll } from '../../utils';
import { Box, Panel } from '../layout';
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
  const device = useDevice();
  const { visible, onClose, onOpen } = useVisible({
    defaultVisible: false,
  });

  return (
    <AdaptivePopup
      hasArrow
      visible={visible}
      onRequestOpen={onOpen}
      onRequestClose={onClose}
      target={target}
      renderChildren={(arg: any) => (
        <Panel {...arg}>
          {arg.arrow}
          {title && (
            <Box py="m" textAlign="center" fontSize="body">
              {title}
            </Box>
          )}
          <Menu.Panel boxShadow="none">
            <Menu.Inner dataSource={dataSource} onItemClick={callAll(onItemClick, onClose)} />
          </Menu.Panel>
        </Panel>
      )}
    />
  );
}
