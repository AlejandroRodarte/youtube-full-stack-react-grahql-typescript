import { ssrExchange, dedupExchange, fetchExchange, Client } from 'urql'
import { initUrqlClient, SSRExchange } from 'next-urql'
import { GetServerSidePropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'
import cacheExchange from '../exchanges/cache'

const getUrqlClientForServerSideProps = (ctx: GetServerSidePropsContext<ParsedUrlQuery>): [Client, SSRExchange] => {
  const ssrCache = ssrExchange({ isClient: false })

  const client = initUrqlClient({
    url: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT_URL,
    fetchOptions: {
      credentials: 'include',
      headers: {
        cookie: ctx && ctx.req ? ctx.req.headers.cookie : null
      }
    },
    exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange]
  }, false)

  return [client, ssrCache]
}

export default getUrqlClientForServerSideProps
