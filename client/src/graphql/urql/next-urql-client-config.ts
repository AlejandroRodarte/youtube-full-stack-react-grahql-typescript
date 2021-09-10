import { SSRExchange, NextUrqlClientConfig } from 'next-urql'
import { dedupExchange, fetchExchange } from 'urql'
import { NextPageContext } from 'next'
import absoluteUrl from 'next-absolute-url'

import cacheExchange from './exchanges/cache'
import isServer from '../../util/common/functions/is-server'

const nextUrqlClientConfig: NextUrqlClientConfig = (ssrExchange: SSRExchange, ctx: NextPageContext) => ({
  url: (process.env.NEXT_PUBLIC_USES_PROXY === 'true' && isServer() && ctx && ctx.req)
    ? `${absoluteUrl(ctx.req).origin}${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT_URL!}`
    : process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT_URL!,
  fetchOptions: {
    credentials: 'include',
    headers: {
      cookie: ctx && ctx.req ? ctx.req.headers.cookie : null
    }
  },
  exchanges: [dedupExchange, cacheExchange, ssrExchange, fetchExchange]
})

export default nextUrqlClientConfig
