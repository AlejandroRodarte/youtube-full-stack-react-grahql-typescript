import { createClient } from 'urql'

const client = createClient({
  url: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT_URL,
  fetchOptions: {
    credentials: 'include'
  }
})

export default client
