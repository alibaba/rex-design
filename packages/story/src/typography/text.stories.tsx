import React from 'react';
import { Flex, Box, Text } from '@rexd/core';

export default { title: 'Typography/Text' };

export const Simple = () => (
  <Flex spacing="l" direction="column">
    <Text fontSize="note">(note) In love with Hippo</Text>
    <Text fontSize="body">(body) In love with Hippo</Text>
    <Text fontSize="base">(base) In love with Hippo</Text>
    <Text fontSize="subtitle">(subtitle) In love with Hippo</Text>
    <Text fontSize="title">(title) In love with Hippo</Text>
    <Text fontSize="subheader">(subheader) In love with Hippo</Text>
    <Text fontSize="header">(header) In love with Hippo</Text>
  </Flex>
);

export const Truncate = () => (
  <Box width="600px" border="solid" borderColor="line.primary">
    <Text isTruncated>
      Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing
      layouts and visual mockups.
    </Text>
  </Box>
);

export const LineClamp = () => (
  <Box width="300px" p="l" border="solid" borderColor="line.primary">
    <Text lineClamp={2}>
      "The quick brown fox jumps over the lazy dog" is an English-language pangram—a sentence that contains all of the
      letters of the English alphabet. Owing to its existence, Chakra was created.
    </Text>
  </Box>
);

export const As = () => (
  <Box>
    <Text as="i">Italic</Text>
    <br />
    <Text as="u">Underline</Text>
    <br />
    <Text as="abbr">I18N</Text>
    <br />
    <Text as="cite">Citation</Text>
    <br />
    <Text as="del">Deleted</Text>
    <br />
    <Text as="em">Emphasis</Text>
    <br />
    <Text as="ins">Inserted</Text>
    <br />
    <Text as="kbd">Ctrl + C</Text>
    <br />
    <Text as="mark">Highlighted</Text>
    <br />
    <Text as="s">Strikethrough</Text>
    <br />
    <Text as="samp">Sample</Text>
    <br />
    <Text as="sub">sub</Text>
    <br />
    <Text as="sup">sup</Text>
  </Box>
);
