import React from 'react';
import styled from 'styled-components';
import { getToken } from '../../utils';
import { Box, BoxProps } from '../layout';

const SystemInputAddon = styled(Box)`
  display: inline-flex;
  align-items: center;
  border-radius: var(--rex-radii-s);
  padding-left: var(--rex-space-m);
  padding-right: var(--rex-space-m);
  border: var(--rex-borders-solid) ${getToken('Input.borderColor')};
  background-color: ${getToken('Input.addonBg')};
  color: ${getToken('Input.addonTextColor')};
  font-size: var(--rex-fontSizes-note);
`;

export interface InputAddonProps extends Omit<BoxProps, 'as'> {}

export function InputAddon(props: InputAddonProps) {
  const { children, ...others } = props;
  return <SystemInputAddon {...others}>{children}</SystemInputAddon>;
}
