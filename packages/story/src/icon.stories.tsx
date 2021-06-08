import { Box, Flex, Group, Input } from '@rexd/core';
import { Icon, ICON_TYPE_LIST, useIconfont } from '@rexd/icon';
import React, { useState } from 'react';

export default { title: 'Icons' };

export const Basic = () => {
  const [query, setQuery] = useState<string>('');

  return (
    <Box>
      <Box>
        <Input placeholder="输入图标名称进行检索" onChange={setQuery} />
      </Box>
      <Flex wrap="wrap">
        {ICON_TYPE_LIST.filter((name) => !query || name.includes(query)).map((iconType) => (
          <Flex direction="column" justify="center" align="center" width="160px" height="120px" key={iconType}>
            <Icon type={iconType} style={{ height: '50px', width: '50px' }} />
            <Box fontSize="16px">{iconType}</Box>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

export const Iconfont = () => {
  const SvgIcon = useIconfont({
    scriptUrl: '//at.alicdn.com/t/font_1062849_wshbvt9mp1.js',
  });

  return (
    <Group fontSize="body">
      <SvgIcon type="audio" size="40px" />
      <SvgIcon type="mouse" size="40px" />
      <SvgIcon type="eye" size="40px" />
      <SvgIcon type="gesture" size="40px" />
    </Group>
  );
};
