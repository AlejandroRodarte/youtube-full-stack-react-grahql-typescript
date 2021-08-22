import React from 'react'
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import { Provider } from 'urql'

import theme from '../theme'
import client from '../graphql/urql/client'

function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <Provider value={ client }>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true
          }}
        >
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp
