import { createClient } from 'urql'
import exchanges from './exchanges'

const client = createClient({
  url: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT_URL,
  fetchOptions: {
    credentials: 'include'
  },
  exchanges
})

export default client
