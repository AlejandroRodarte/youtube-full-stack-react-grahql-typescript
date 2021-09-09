import { Resolver } from '@urql/exchange-graphcache'

import posts from './posts'

const Query: {
  [fieldName: string]: Resolver
} = {
  posts
}

export default Query
