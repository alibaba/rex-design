import { Box, Flex, Input } from '@rexd/core';
import { Icon, iconTypes } from '@rexd/icon';
import React, { useEffect, useRef, useState } from 'react';

export default { title: 'Icons' };

export const Basic = () => {
  const [query, setQuery] = useState<string>(null);
  const ref = useRef<HTMLInputElement>();

  useEffect(() => {
    ref.current.focus();
  }, []);

  return (
    <>
      <Box>
        搜索: <Input onChange={setQuery} style={{ width: '150px' }} ref={ref} />
      </Box>
      <Flex wrap="wrap">
        {iconTypes
          .filter((name) => !query || query.length === 0 || name.includes(query))
          .map((iconType) => (
            <Flex direction="column" justify="center" align="center" width="160px" height="120px" key={iconType}>
              <Icon type={iconType} style={{ height: '50px', width: '50px' }} />
              <Box fontSize="16px">{iconType}</Box>
            </Flex>
          ))}
      </Flex>
    </>
  );
};
