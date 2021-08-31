import { NonEmptyArray } from 'type-graphql'

import PostResolvers from './posts'
import UserResolvers from './users'

const resolvers: NonEmptyArray<Function> = [
  ...PostResolvers,
  ...UserResolvers
]

export default resolvers
