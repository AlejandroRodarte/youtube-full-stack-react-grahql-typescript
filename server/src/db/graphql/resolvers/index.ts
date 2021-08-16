import { NonEmptyArray } from 'type-graphql'

import HelloResolver from './hello-resolver'
import PostsResolver from './posts-resolver'

const resolvers: NonEmptyArray<Function> = [HelloResolver, PostsResolver]

export default resolvers
