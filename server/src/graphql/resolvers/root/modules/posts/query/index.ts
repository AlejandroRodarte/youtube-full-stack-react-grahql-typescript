import { NonEmptyArray } from 'type-graphql'

import PostsResolver from './posts-resolver'
import PostResolver from './post-resolver'

const query: NonEmptyArray<Function> = [
  PostsResolver,
  PostResolver
]

export default query
