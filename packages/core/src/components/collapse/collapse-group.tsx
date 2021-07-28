import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Box } from '../layout';
import { CollapseGroupProvider } from './context';
import { Collapse, CollapseOptions, CollapseProps } from './collapse';
import { useId, useSelectableList } from '../../hooks';

const RexCollapseGroup = styled(Box)`
  border: var(--rex-borders-solid) var(--rex-colors-line-border);
  border-radius: var(--rex-radii-s);
`;

export interface CollapseGroupProps {
  defaultExpandedKeys?: string[];
  expandedKeys?: string[];
  onExpand?: (expandedKeys: string[] | string) => void;
  accordion?: boolean;
  disabled?: boolean;
  dataSource?: CollapseOptions[];
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactElement[];
}

export function CollapseGroup({
  expandedKeys,
  defaultExpandedKeys,
  onExpand,
  accordion = false,
  disabled = false,
  dataSource,
  style,
  className,
  children,
}: CollapseGroupProps) {
  const { value, onSelect } = useSelectableList({
    component: 'Collapse',
    selectMode: accordion ? 'single' : 'multiple',
    value: expandedKeys,
    defaultValue: defaultExpandedKeys,
    onChange: onExpand,
  });

  const getPanelsByDataSource = useCallback(() => {
    return dataSource.map((item, index) => {
      const key = item?.collapseKey || String(index);

      return (
        <Collapse key={key} collapseKey={key} disabled={disabled} {...item}>
          {item.content}
        </Collapse>
      );
    });
  }, [dataSource, disabled]);

  const getPanelsByChildren = useCallback(() => {
    return React.Children.map(children, (child, index) => {
      if (React.isValidElement(child)) {
        const key = (child.props as CollapseProps)?.collapseKey || String(index);
        return React.cloneElement<CollapseProps>(child, { collapseKey: key, disabled });
      }
    });
  }, [children, disabled]);

  const fallbackName = useId('CollapseContext');

  const group = useMemo(
    () => ({
      name: fallbackName,
      value,
      onSelect,
    }),
    [fallbackName, value, onSelect],
  );

  return (
    <CollapseGroupProvider value={group}>
      <RexCollapseGroup className={className} style={style}>
        {dataSource ? getPanelsByDataSource() : getPanelsByChildren()}
      </RexCollapseGroup>
    </CollapseGroupProvider>
  );
}
