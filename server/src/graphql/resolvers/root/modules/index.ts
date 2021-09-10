import { NonEmptyArray } from 'type-graphql'

import posts from './posts'
import users from './users'

const modules: NonEmptyArray<Function> = [
  ...posts,
  ...users
]

export default modules
