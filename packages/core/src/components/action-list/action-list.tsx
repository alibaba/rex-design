import React from 'react';
import styled from 'styled-components';
import { useActionList, UseActionListProps } from './use-action-list';

const ActionListBox = styled.div`
  display: inline-flex;
  align-items: center;

  > *:not(:last-child) {
    margin-right: var(--rex-space-m);
  }
`;

export interface ActionListProps extends UseActionListProps {}

export function ActionList(props: ActionListProps) {
  const { actionNodes, getRootProps } = useActionList(props);
  const rootProps = getRootProps();
  return <ActionListBox {...rootProps}>{actionNodes}</ActionListBox>;
}
