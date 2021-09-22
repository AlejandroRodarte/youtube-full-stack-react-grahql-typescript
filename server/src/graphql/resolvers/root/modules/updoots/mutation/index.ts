import { NonEmptyArray } from 'type-graphql'

import RootVoteResolver from './vote-resolver'

const mutation: NonEmptyArray<Function> = [
  RootVoteResolver
]

export default mutation
