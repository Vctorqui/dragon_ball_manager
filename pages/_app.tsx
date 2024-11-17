import { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import theme from '../theme/theme'

export const metadata = {
  title: 'Dragon Ball Web',
  description: 'Discover, add, and manage your favorite Dragon Ball characters',
}

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta charSet='UTF-8' />
          <title>{metadata.title}</title>
          <meta name='description' content={metadata.description} />
        </Head>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default App
