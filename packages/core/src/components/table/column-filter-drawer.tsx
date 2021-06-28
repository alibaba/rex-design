import { isLeafNode } from 'ali-react-table';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from '../button';
import { Checkbox } from '../checkbox';
import { Drawer } from '../overlays';
import { Column } from './base-table';

const TreeDiv = styled.div`
  .group {
    margin: 8px 0;
    .group {
      margin: 4px 0;
    }
  }

  .line {
    height: 28px;
    display: flex;
    align-items: center;

    .checkbox {
      flex: 0 0 50%;
    }
  }

  .group-header {
    height: 32px;
    display: flex;
    align-items: center;
  }

  .group-content {
    margin-left: 16px;
  }
`;

const StyledDrawerTitle = styled.div`
  display: flex;
  align-items: center;

  .actions {
    margin-left: auto;
    margin-right: 32px;

    > .action {
      padding: 0 4px;
      color: #3468ca;
      cursor: pointer;
      font-size: 14px;
    }
  }
`;

const Footer = styled.footer`
  flex: 0 0 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid var(--rex-colors-emphasis-20);
  margin-top: auto;
`;

export interface ColumnFilterDrawerProps {
  visible: boolean;
  onRequestClose(): void; // todo onRequestClose
  enforceCheckedCodes: string[];
  checkedCodes: string[];
  onChange(nextCheckedCodes: string[]): void;
  columns: Column[];
  width: number;
  title: React.ReactNode;
  showCheckAll: boolean;
  showUncheckAll: boolean;
}

export function ColumnFilterDrawer({
  visible,
  onRequestClose,
  enforceCheckedCodes = [],
  checkedCodes,
  onChange,
  columns,
  width = 500,
  title = '自定义显示列',
  showCheckAll = true,
  showUncheckAll = true,
}: ColumnFilterDrawerProps) {
  const [editingCheckedCodes, updateEditingCheckedCodes] = useState(checkedCodes);
  const editingCheckedCodeSet = new Set(editingCheckedCodes);
  const enforceCheckedCodeSet = new Set(enforceCheckedCodes);

  useEffect(() => {
    if (visible) {
      updateEditingCheckedCodes(checkedCodes);
    }
  }, [checkedCodes, visible]);

  const onOk = () => {
    onRequestClose();
    onChange(editingCheckedCodes);
  };

  const onCheck = (targetCodes: string[], action: 'check' | 'uncheck') => {
    if (action === 'check') {
      updateEditingCheckedCodes(
        editingCheckedCodes.concat(targetCodes.filter((code) => !editingCheckedCodeSet.has(code))),
      );
    } else {
      const targetCodeSet = new Set(targetCodes);
      updateEditingCheckedCodes(editingCheckedCodes.filter((code) => !targetCodeSet.has(code)));
    }
  };

  function dfs(columns: Column[]) {
    let lineCount = 0;
    let tempLine: React.ReactElement[] = [];
    const nodes: React.ReactElement[] = [];
    const codes: string[] = [];
    let allCheck = true;
    let anyCheck = false;

    function flushTempLine(force: boolean) {
      const FLAT_COUNT = 2;
      if ((force && tempLine.length > 0) || tempLine.length >= FLAT_COUNT) {
        nodes.push(
          <div className="line" key={`line-${lineCount}`}>
            {tempLine}
          </div>,
        );
        lineCount += 1;
        tempLine = [];
      }
    }

    function addToTempLine(node: React.ReactElement) {
      flushTempLine(false);
      tempLine.push(node);
    }

    for (let colIndex = 0; colIndex < columns.length; colIndex++) {
      const col = columns[colIndex];
      if (isLeafNode(col)) {
        if (col.code) {
          const enforceChecked = enforceCheckedCodeSet.has(col.code);
          const checked = editingCheckedCodeSet.has(col.code);

          if (!enforceChecked) {
            codes.push(col.code);

            if (checked) {
              anyCheck = true;
            } else {
              allCheck = false;
            }
          }

          addToTempLine(
            <Checkbox
              key={colIndex}
              className="checkbox"
              checked={checked || enforceChecked}
              disabled={enforceChecked}
              onChange={() => onCheck([col.code], checked ? 'uncheck' : 'check')}
            >
              {col.title ?? col.name}
            </Checkbox>,
          );
        } // else 忽略 col.code 为空的 column
      } else {
        const sub = dfs(col.children);
        if (!sub.allCheck) {
          allCheck = false;
        }
        if (sub.anyCheck) {
          anyCheck = true;
        }
        codes.push(...sub.codes);
        flushTempLine(true);
        nodes.push(
          <div className="group" key={colIndex}>
            <div className="group-header">
              <Checkbox
                className="checkbox"
                checked={sub.allCheck}
                indeterminate={!sub.allCheck && sub.anyCheck}
                onChange={() => onCheck(sub.codes, sub.allCheck ? 'uncheck' : 'check')}
              >
                {col.title ?? col.name}
              </Checkbox>
            </div>
            <div className="group-content">{sub.nodes}</div>
          </div>,
        );
      }
    }

    flushTempLine(true);

    return { nodes, allCheck, anyCheck, codes };
  }

  const dfsResult = dfs(columns);

  return (
    <Drawer
      visible={visible}
      onRequestClose={onRequestClose}
      canCloseByIcon
      canCloseByOutSideClick
      canCloseByEsc
      title={
        <StyledDrawerTitle>
          <span style={{ fontSize: 14 }}>{title}</span>
          <div className="actions">
            {showCheckAll && (
              <span className="action" onClick={() => onCheck(dfsResult.codes, 'check')}>
                全选
              </span>
            )}
            {showUncheckAll && (
              <span className="action" onClick={() => onCheck(dfsResult.codes, 'uncheck')}>
                清空
              </span>
            )}
          </div>
        </StyledDrawerTitle>
      }
      style={{ width }}
      footer={
        <Footer>
          <Button type="primary" onClick={onOk}>
            确认
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={onRequestClose}>
            取消
          </Button>
        </Footer>
      }
    >
      <TreeDiv>{dfsResult.nodes}</TreeDiv>
    </Drawer>
  );
}
