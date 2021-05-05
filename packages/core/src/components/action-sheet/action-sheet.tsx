import React from 'react';
import { Box } from '../layout';
import { AdaptivePopup, PopupProps } from '../overlays';
import { Menu, MenuProps } from '../menu';
import { useVisible } from '../../hooks';
import { useDevice } from '../../providers';
import { callAll } from '../../utils';

export interface ActionSheetProps {
  /**
   * 面板标题
   */
  title?: string;

  trigger: PopupProps['trigger'];

  dataSource?: MenuProps['dataSource'];
  onItemClick?: MenuProps['onItemClick'];
}

export function ActionSheet(props: ActionSheetProps) {
  const { title, trigger, dataSource = [], onItemClick } = props;
  const { device } = useDevice();
  const { visible, onClose, onOpen } = useVisible({
    defaultVisible: false,
  });

  return (
    <AdaptivePopup hasArrow visible={visible} onRequestOpen={onOpen} onRequestClose={onClose} trigger={trigger}>
      <Box boxShadow="lowDown" width={device.alias === 's' ? '90vw' : '100px'}>
        {title && (
          <Box py="m" textAlign="center" fontSize="body">
            {title}
          </Box>
        )}
        <Menu className="minimal" dataSource={dataSource} onItemClick={callAll(onItemClick, onClose)} />
      </Box>
    </AdaptivePopup>
  );
}