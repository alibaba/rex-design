import { Cascader, RadioGroup } from '@rexd/core';
import React, { useEffect, useState } from 'react';
import { bigTreeDataSource } from './tree-select.stories';

export default {
  title: 'Select / Cascader',
};

function getLast(value: string[]) {
  return value.length === 0 ? null : value[value.length - 1];
}

function useDistrictsTreeData() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch('https://os.alipayobjects.com/rmsportal/ODDwqcDFTLAguOvWEolX.json')
      .then((response) => response.json())
      .then((data) => {
        data[1].disabled = true;
        setData(data);
      })
      .catch((e) => console.log(e));
  }, []);

  return data;
}

export function Basic() {
  return <Cascader style={{ border: '1px solid var(--rex-colors-emphasis-20)' }} dataSource={bigTreeDataSource} />;
}

export function Controlled() {
  const dataSource = useDistrictsTreeData();

  const [selectedKey, setSelectedKey] = useState('4204');

  return (
    <div>
      <div>(受控单选) 当前 selectedKey: {selectedKey}</div>
      <Cascader
        // dataSource 加载完成时，重新加载 cascader
        key={dataSource.length}
        style={{ border: '1px solid var(--rex-colors-emphasis-20)' }}
        selectedKeys={[selectedKey]}
        onSelect={(keys) => setSelectedKey(getLast(keys))}
        dataSource={dataSource}
      />
    </div>
  );
}

export function MaxDepth() {
  const dataSource = useDistrictsTreeData();

  const [maxDepth, setMaxDepth] = useState(2);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
        最大深度：
        <RadioGroup
          value={String(maxDepth)}
          onChange={(d) => setMaxDepth(Number(d))}
          dataSource={[0, 1, 2].map((d) => ({ value: String(d), label: String(d) }))}
        />
      </div>

      <Cascader
        // dataSource 加载完成时，重新加载 cascader
        key={dataSource.length}
        style={{ border: '1px solid var(--rex-colors-emphasis-20)' }}
        dataSource={dataSource}
        maxDepth={maxDepth}
        defaultSelectedKeys={['4204']}
      />
    </div>
  );
}

export function Multiple() {
  const [selectedKeys, onSelect] = useState(['1']);
  return (
    <div>
      <div>
        (受控多选) 当前 selectedKeys: <code>{selectedKeys.join(',')}</code>
      </div>
      <Cascader
        style={{ border: '1px solid var(--rex-colors-emphasis-20)' }}
        selectedKeys={selectedKeys}
        onSelect={onSelect}
        dataSource={bigTreeDataSource}
      />
    </div>
  );
}
