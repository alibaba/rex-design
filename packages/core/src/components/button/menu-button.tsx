import React from 'react';
import { Icon } from '@rexd/icon';
import { AdaptivePopup } from '../overlays';
import { Menu, MenuProps } from '../menu';
import { useVisible } from '../../hooks';
import { callAll } from '../../utils';
import { Button } from './Button';

export interface MenuButtonProps {
  dataSource?: MenuProps['dataSource'];
  onItemClick?: MenuProps['onItemClick'];
  children?: React.ReactNode;
}

export function MenuButton(props: MenuButtonProps) {
  const { dataSource = [], onItemClick, children, ...rest } = props;
  const { visible, onClose, onOpen } = useVisible({
    defaultVisible: false,
  });

  const renderTarget = (pass: any) => {
    const icon = <Icon type={visible ? 'arrow-up-bold' : 'arrow-down-bold'} />;
    const shared = {
      ...pass,
      ...rest,
    };

    return (
      <Button {...shared} rightElement={icon}>
        {children}
      </Button>
    );
  };

  return (
    <AdaptivePopup visible={visible} onRequestClose={onClose} onRequestOpen={onOpen} renderTarget={renderTarget}>
      <Menu dataSource={dataSource} onItemClick={callAll(onClose, onItemClick)} />
    </AdaptivePopup>
  );
}
