import { NonEmptyArray } from 'type-graphql'

import post from './post'
import user from './user'

const entities: NonEmptyArray<Function> = [
  ...post,
  ...user
]

export default entities
