import { Icon } from '@rexd/icon';
import { isLeafNode, makeRecursiveMapper, TablePipeline } from 'ali-react-table';
import React from 'react';

function ColumnGroupTitle({
  expanded,
  name,
  onExpand,
}: {
  expanded: boolean;
  name: string;
  onExpand(nextExpanded: boolean): void;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Icon
        type={expanded ? 'minus' : 'add'}
        onClick={() => onExpand(!expanded)}
        style={{
          border: '1px solid #dcdcdc',
          borderRadius: 2,
          background: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          width: 20,
          height: 20,
          marginRight: 8,
          color: '#999999',
        }}
      />
      <span>{name}</span>
    </div>
  );
}

const stateKey = 'columnCollapse';

export interface ColumnCollapseFeatureOptions {
  expandedGroups?: string[];
  onExpand?: (nextExpandedGroups: string[]) => void;
  defaultExpandedGroups?: string[];
}

export function columnCollapse(opts: ColumnCollapseFeatureOptions = {}) {
  return function columnCollapseFeature(pipeline: TablePipeline) {
    const expandedGroups = opts.expandedGroups ?? pipeline.getStateAtKey(stateKey) ?? opts.defaultExpandedGroups ?? [];

    const onExpand = (nextExpandedGroups: string[]) => {
      opts.onExpand?.(nextExpandedGroups);
      pipeline.setStateAtKey(stateKey, nextExpandedGroups);
    };

    return pipeline.mapColumns(
      makeRecursiveMapper((col) => {
        const isColumnGroup =
          !isLeafNode(col) && col.code != null && col.features?.collapsible && col.children.length > 1;

        if (!isColumnGroup) {
          return col;
        }

        const group = col;
        const expanded = expandedGroups.includes(group.code);

        const primaryColumn = group.children.find((col) => col.features?.primaryColumn) ?? group.children[0];

        return {
          ...group,
          title: (
            <ColumnGroupTitle
              expanded={expanded}
              name={group.name}
              onExpand={() => {
                if (expanded) {
                  onExpand(expandedGroups.filter((g) => g !== group.code));
                } else {
                  onExpand(expandedGroups.concat([group.code]));
                }
              }}
            />
          ),
          children: expanded ? group.children : [primaryColumn],
        };
      }),
    );
  };
}
