import { Box, Grid, Group, Input, Icon, ICON_TYPE_LIST, useIconfont, GridItem } from '@rexd/core';
import React, { useState } from 'react';

export default { title: 'Icons' };

export const Basic = () => {
  const [query, setQuery] = useState<string>('');

  return (
    <Box>
      <Box>
        <Input placeholder="输入图标名称进行检索" onChange={setQuery} />
      </Box>
      <Grid columns={5}>
        {ICON_TYPE_LIST.filter((name) => !query || name.includes(query)).map((iconType) => (
          <GridItem key={iconType} textAlign="center" py="l">
            <Icon type={iconType} style={{ height: '50px', width: '50px' }} />
            <Box fontSize="16px">{iconType}</Box>
          </GridItem>
        ))}
      </Grid>
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
