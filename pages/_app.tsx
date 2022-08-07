import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { useState } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
	const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
	
	function toggleColorScheme(value?: ColorScheme) {
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
	}

	return (
		<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
			<MantineProvider theme={{colorScheme}} withGlobalStyles withNormalizeCSS>
				<Component {...pageProps} />
			</MantineProvider>
		</ColorSchemeProvider>
	)
}

export default MyApp
