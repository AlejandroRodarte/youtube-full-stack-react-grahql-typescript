import { NonEmptyArray } from 'type-graphql'

import mutation from './mutation'
import query from './query'

const users: NonEmptyArray<Function> = [
  ...mutation,
  ...query
]

export default users
