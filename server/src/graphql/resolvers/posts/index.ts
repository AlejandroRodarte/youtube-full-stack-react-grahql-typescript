import { NonEmptyArray } from 'type-graphql'

import mutation from './mutation'
import query from './query'

const posts: NonEmptyArray<Function> = [
  ...mutation,
  ...query
]

export default posts
