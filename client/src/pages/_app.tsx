import React from 'react'
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'

import { AppContextWrapper } from '../context/app-context'
import theme from '../theme'

function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true
        }}
      >
        <AppContextWrapper>
          <Component {...pageProps} />
        </AppContextWrapper>
      </ColorModeProvider>
    </ChakraProvider>
  )
}

export default MyApp
