import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { useState } from 'react';
import { useLocalStorage } from '@mantine/hooks';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  function toggleColorScheme(value?: ColorScheme) {
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  }

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          colorScheme,
          colors: {
            twitch: [
              '#C7B9DB',
              '#B29AD5',
              '#9E7AD4',
              '#8A55DA',
              '#772CE8',
              '#6C2CCC',
              '#6436A9',
              '#5C3B8E',
              '#553D78',
              '#4D3C67',
            ],
          },
          primaryColor: 'twitch',
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default MyApp;
