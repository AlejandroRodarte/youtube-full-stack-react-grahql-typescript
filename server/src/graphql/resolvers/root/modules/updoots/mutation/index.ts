import { NonEmptyArray } from 'type-graphql'

import VoteResolver from './vote-resolver'

const mutation: NonEmptyArray<Function> = [
  VoteResolver
]

export default mutation
