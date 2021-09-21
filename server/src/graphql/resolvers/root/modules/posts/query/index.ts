import { NonEmptyArray } from 'type-graphql'

import RootPostsResolver from './posts-resolver'
import RootPostResolver from './post-resolver'

const query: NonEmptyArray<Function> = [
  RootPostsResolver,
  RootPostResolver
]

export default query
