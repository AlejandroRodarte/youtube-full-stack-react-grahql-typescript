import { SSRExchange, NextUrqlClientConfig } from 'next-urql'
import { dedupExchange, fetchExchange } from 'urql'
import { NextPageContext } from 'next'

import cacheExchange from './exchanges/cache'

const nextUrqlClientConfig: NextUrqlClientConfig = (ssrExchange: SSRExchange, ctx: NextPageContext) => ({
  url: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT_URL,
  fetchOptions: {
    credentials: 'include',
    headers: {
      cookie: ctx && ctx.req ? ctx.req.headers.cookie : null
    }
  },
  exchanges: [dedupExchange, cacheExchange, ssrExchange, fetchExchange]
})

export default nextUrqlClientConfig
