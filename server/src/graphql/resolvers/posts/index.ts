import { NonEmptyArray } from 'type-graphql'

import fields from './fields'
import mutation from './mutation'
import query from './query'

const posts: NonEmptyArray<Function> = [
  ...fields,
  ...mutation,
  ...query
]

export default posts
