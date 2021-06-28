import doctrine from 'doctrine';
import _ from 'lodash-es';
import React from 'react';
import styled from 'styled-components';

const StyledTable = styled.table`
  --ifm-table-cell-padding: 0.5rem;
  font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace;
  font-size: 14px;
  display: table;

  td.category {
    font-size: 16px;
    font-weight: bold;
    padding: 0.75rem;
  }

  .default-value {
    color: var(--ifm-color-emphasis-700);
  }
`;

const DEFAULT_CATEGORY = '@_@.default_category.@_@';

type DecGenInfo = {
  description: string;
  displayName: string;
  props: {
    [prop: string]: {
      defaultValue: { value: any };
      description: string;
      name: string;
      required: boolean;
      type: { name: string };
    };
  };
};

interface PlainProp {
  name: string;
  type: string;
  required?: boolean;
  description?: string;
  defaultValue?: string | { value: any };
  category?: string;
}

function PlainPropsTable({ props }: { props: PlainProp[] }) {
  const list = props.map((item) => ({ ...item, category: item.category ?? DEFAULT_CATEGORY }));

  const categoryNames: string[] = [];
  for (const item of list) {
    if (!categoryNames.includes(item.category)) {
      categoryNames.push(item.category);
    }
  }
  // 使得 DEFAULT_CATEGORY 总是在第一个（如果存在的话）
  const defaultCategoryIndex = categoryNames.indexOf(DEFAULT_CATEGORY);
  if (defaultCategoryIndex !== -1) {
    categoryNames.splice(defaultCategoryIndex, 1);
    categoryNames.unshift(DEFAULT_CATEGORY);
  }

  const groups = _.groupBy(list, (item) => item.category);

  const renderedRows = [];

  for (const categoryName of categoryNames) {
    if (categoryName !== DEFAULT_CATEGORY) {
      renderedRows.push(
        <tr key={`category-${categoryName}`}>
          <td className="category" colSpan={3}>
            {categoryName}
          </td>
        </tr>,
      );
    }

    for (const { defaultValue, name, description, type, required } of groups[categoryName]) {
      renderedRows.push(
        <tr key={name}>
          <td style={{ verticalAlign: 'top' }}>
            {name}
            {required && <span style={{ color: 'red', marginLeft: 2 }}>*</span>}
          </td>
          <td>
            {type && <code>{type.replace('<unknown>', '')}</code>}
            <DefaultValue config={defaultValue} />
            {type && description && <br />}
            {description}
          </td>
        </tr>,
      );
    }
  }

  return (
    <StyledTable>
      <tbody>
        <tr>
          <th>字段</th>
          <th>描述</th>
        </tr>
        {renderedRows}
      </tbody>
    </StyledTable>
  );
}

/**
 * 展示一个组件的 props 表格
 *
 * TODO 展示指定分组的 API
 * TODO 隐藏指定的 API
 * */
export default function PropsTable({ component, props }: { component?: any; props?: PlainProp[] }) {
  if (Array.isArray(props)) {
    return <PlainPropsTable props={props} />;
  }

  if (component == null) {
    return (
      <div className="admonition admonition-danger alert alert--danger">
        <div className="admonition-heading">
          <h2>MDX 渲染 PropsTable 失败</h2>
        </div>
        <div className="admonition-content">请确认 component 是否正确被引入</div>
      </div>
    );
  }

  return (
    <div data-props-table={component.displayName ?? component.name} style={{ overflow: 'auto' }}>
      {process.env.NODE_ENV !== 'production' && (
        <p
          style={{
            color: 'var(--ifm-color-danger-darker)',
            fontWeight: 'bold',
            fontSize: '80%',
            marginBottom: '0.5rem',
          }}
        >
          你正在查看开发阶段下的 {component.displayName ?? component.name} API 表格。生产环境下该信息将隐藏。
        </p>
      )}
      {renderInner(component.__docgenInfo)}
    </div>
  );

  function renderInner(docs: DecGenInfo) {
    if (docs == null || docs.props == null) {
      return null;
    }

    const list: PlainProp[] = Object.values(docs.props).map(({ description: rawDescription, ...item }) => {
      const { description, tags } = doctrine.parse(rawDescription);
      const tagDict = Object.fromEntries(tags.map((tag) => [tag.title, tag.description]));

      const type = tagDict.displayType ?? item.type.name;

      return {
        name: item.name,
        type,
        required: item.required,
        defaultValue: item.defaultValue,
        description,
        category: tagDict.category,
        tags,
        tagDict,
      };
    });

    return <PlainPropsTable props={list} />;
  }
}

function DefaultValue({ config }: { config: { value: any } | string }) {
  if (config == null) {
    return null;
  }

  if (typeof config === 'string') {
    return <i className="default-value"> = {config}</i>;
  }

  if (typeof config.value === 'string') {
    // 移除文档中不需要的类型强制转换
    // 例如 [] as OverlayProps['safeNodes']
    return <i className="default-value"> = {config.value.replace(/ as .*$/, '')}</i>;
  }

  return <i className="default-value"> = {JSON.stringify(config.value)}</i>;
}
