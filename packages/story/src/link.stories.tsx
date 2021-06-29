import { Link, Text } from '@rexd/core';
import { Icon } from '@rexd/icon';
import React from 'react';

export default { title: 'Link' };

export const Basic = () => <Link href="#">Hippo Design</Link>;

export const ExternalLink = () => (
  <Link href="https://alibaba.github.io/rex-design/" external>
    Chakra Design system <Icon type="link" />
  </Link>
);

export const TextWithLink = () => (
  <Text>
    你可以将 <Link href="#">Link 用于文本内容中</Link>
  </Text>
);
