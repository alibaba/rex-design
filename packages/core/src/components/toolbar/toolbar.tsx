import React from 'react';
import { Box } from '../layout';
import { ActionList } from '../action-list';
import { useToolbar, UseToolbarProps } from './use-toolbar';

export interface ToolbarProps extends UseToolbarProps {}

export function Toolbar(props: ToolbarProps) {
  const { actions, htmlProps } = useToolbar(props);

  return (
    <Box display="flex" justifyContent="flex-end" {...htmlProps}>
      <ActionList actions={actions} />
    </Box>
  );
}

export function FooterToolbar(props: ToolbarProps) {
  const { actions } = useToolbar(props);
  // TODO: sticky footer
  return (
    <Box bg="emphasis.0" display="flex" justifyContent="center" borderTop="solid" borderTopColor="line.border" py="m">
      <ActionList hasDivider={false} actions={actions} />
    </Box>
  );
}
