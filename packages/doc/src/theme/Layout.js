import React from 'react';
import OriginalLayout from '@theme-original/Layout';
import useThemeContext from '@theme/hooks/useThemeContext';
import { AppProvider } from '@rexd/core';

function LayoutInner({ children }) {
  const { isDarkTheme } = useThemeContext();

  return <AppProvider colorMode={isDarkTheme ? 'dark' : 'light'}>{children}</AppProvider>;
}

export default function Layout({ children, ...props }) {
  return (
    <OriginalLayout {...props}>
      <LayoutInner>{children}</LayoutInner>
    </OriginalLayout>
  );
}
