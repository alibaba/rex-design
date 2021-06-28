import React from 'react';
import { Box } from '../../layout';
import { ActionList } from '../../action-list';
import { useLegacyToolbar, UseLegacyToolbarProps } from './use-legacy-toolbar';

export interface LegacyToolbarProps extends UseLegacyToolbarProps {}

export function LegacyToolbar(props: LegacyToolbarProps) {
  const { actions, htmlProps } = useLegacyToolbar(props);

  return (
    <Box display="flex" justifyContent="flex-end" {...htmlProps}>
      <ActionList actions={actions} />
    </Box>
  );
}

export function LegacyFooterToolbar(props: LegacyToolbarProps) {
  const { actions } = useLegacyToolbar(props);
  return (
    <Box bg="emphasis.0" display="flex" justifyContent="center" borderTop="solid" borderTopColor="line.border" py="m">
      <ActionList hasSeparator={false} actions={actions} />
    </Box>
  );
}
