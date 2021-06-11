// @ts-nocheck
import { BaseTable, Button } from '@rexd/core';
import { ArtColumn as Column } from 'ali-react-table';
import cx from 'classnames';
import { action } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { arrayHelpers } from './array-helpers';
import { Form, FormArrayLayoutInput } from './form';
import { FormItem } from './form-item';

const range = (n: number) => {
  const result: number[] = [];
  for (let i = 0; i < n; i++) {
    result.push(i);
  }
  return result;
};

export interface ArrayCardOptions {
  title?: string;
  showItemCount?: boolean;
  showItemOrder?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export const arrayCard = ({ title, showItemCount, showItemOrder, style, className }: ArrayCardOptions = {}) => {
  const arrayItemActionsStyle: React.CSSProperties = {
    position: 'absolute',
    top: 8,
    right: 8,
    display: 'flex',
    gap: 8,
    zIndex: 20,
  };

  return (input: FormArrayLayoutInput): React.ReactElement => {
    const { arrayModel, itemContent, itemCount, itemFactory } = input;
    return (
      <div className={cx('xform-array', className)} style={{ marginTop: 16, marginBottom: 8, ...style }}>
        {(title || showItemCount) && (
          <h2>
            {title ?? '列表'} {showItemCount && `(${itemCount})`}
          </h2>
        )}

        {itemCount === 0 && (
          <div style={{ border: '1px dashed #aaa', marginTop: 16, padding: 8, position: 'relative', fontSize: 20 }}>
            空空如也~~
          </div>
        )}

        <div className="xform-array-items">
          {range(itemCount).map((itemIndex) => (
            <div
              key={arrayHelpers.getKey(arrayModel, itemIndex)}
              className="xform-array-item"
              style={{ border: '1px dashed #aaa', marginTop: 16, padding: 8, position: 'relative' }}
            >
              {showItemOrder && (
                <code style={{ fontSize: 16 }}>
                  {arrayModel.path.join('.')}#{itemIndex}
                </code>
              )}
              <ArrayItemActions {...input} itemIndex={itemIndex} style={arrayItemActionsStyle} />
              {arrayHelpers.renderArrayItem(arrayModel, itemIndex, itemContent)}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12 }}>
          <Button
            onClick={action(() => {
              arrayHelpers.append(arrayModel, itemFactory);
            })}
          >
            添加一项
          </Button>
        </div>
      </div>
    );
  };
};

const ArrayItemActions = observer(
  ({
    arrayModel,
    itemCount,
    itemIndex,
    style,
  }: FormArrayLayoutInput & { itemIndex: number; style?: React.CSSProperties }) => {
    return (
      <div style={style}>
        <Button
          size="small"
          onClick={action(() => {
            arrayHelpers.delete(arrayModel, itemIndex);
          })}
        >
          删除
        </Button>
        <Button
          size="small"
          disabled={itemIndex === 0}
          onClick={action(() => {
            arrayHelpers.moveUp(arrayModel, itemIndex);
          })}
        >
          上移
        </Button>
        <Button
          size="small"
          disabled={itemIndex === itemCount - 1}
          onClick={action(() => {
            arrayHelpers.moveDown(arrayModel, itemIndex);
          })}
        >
          下移
        </Button>
      </div>
    );
  },
);

export const arrayTable = ({
  defaultColumnWidth,
  orderColumn,
  operationColumn,
  className,
  style,
}: {
  defaultColumnWidth?: number;
  operationColumn?: Partial<Column>;
  orderColumn?: Partial<Column>;
  style?: React.CSSProperties;
  className?: string;
} = {}) => {
  const arrayItemActionsStyle = { display: 'flex', gap: 0 } as const;

  return (input: FormArrayLayoutInput) => {
    const { arrayModel, itemContent, itemCount, itemFactory } = input;
    const formItems: any[] = React.Children.toArray(itemContent).filter((item: any) => item.type === FormItem);

    const columns: Column[] = formItems.map((item) => ({
      name: typeof item.props.label === 'string' ? item.props.label : null,
      title: item.props.label,
      ...item.props['x-table-column'],
      render(_: any, row: any) {
        // TODO XFormObject 最好是能够放到 tr 元素上，需要 ali-react-table 进行支持
        return (
          <Form.Object name={String(row.itemIndex)}>
            {React.cloneElement(item, {
              className: cx(item.className, 'minimal'),
            })}
          </Form.Object>
        );
      },
    }));

    if (orderColumn != null) {
      columns.unshift({
        name: '#',
        ...orderColumn,
        getValue(row: any): any {
          return row.itemIndex + 1;
        },
      });
    }

    if (operationColumn != null) {
      // 操作列
      columns.push({
        name: '',
        ...operationColumn,
        render(_: any, row: any) {
          return <ArrayItemActions {...input} itemIndex={row.itemIndex} style={arrayItemActionsStyle} />;
        },
      });
    }

    return (
      <div style={style} className={className}>
        <BaseTable
          className="bordered"
          primaryKey="rowKey"
          defaultColumnWidth={defaultColumnWidth}
          dataSource={range(itemCount).map((itemIndex) => ({
            rowKey: arrayHelpers.getKey(arrayModel, itemIndex),
            itemIndex,
          }))}
          columns={columns}
          style={{
            '--cell-padding': '8px',
          }}
        />
        <div
          style={{
            padding: 4,
            height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f5f5f5',
          }}
        >
          <Button
            type="primary"
            onClick={() => {
              arrayHelpers.append(arrayModel, itemFactory);
            }}
          >
            添加一行
          </Button>
        </div>
      </div>
    );
  };
};
