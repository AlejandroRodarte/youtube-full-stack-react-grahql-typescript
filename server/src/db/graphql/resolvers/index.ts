import { NonEmptyArray } from 'type-graphql'

import HelloResolver from './hello-resolver'
import PostsResolver from './posts-resolver'
import UsersResolver from './users-resolver'

const resolvers: NonEmptyArray<Function> = [
  HelloResolver,
  PostsResolver,
  UsersResolver
]

export default resolvers
