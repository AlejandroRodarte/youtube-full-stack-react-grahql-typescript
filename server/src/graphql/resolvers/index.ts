import { NonEmptyArray } from 'type-graphql'

import PostsResolver from './posts-resolver'
import UsersResolver from './users-resolver'

const resolvers: NonEmptyArray<Function> = [
  PostsResolver,
  UsersResolver
]

export default resolvers
