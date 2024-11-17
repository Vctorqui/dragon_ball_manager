import { Metadata } from 'next'
import { Html, Head, Main, NextScript } from 'next/document'

export const metadata: Metadata = {
  title: 'Dragon Ball Web',
  description: 'Discover, add, and Manage your favorite Dragon Ball characters',
}

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
