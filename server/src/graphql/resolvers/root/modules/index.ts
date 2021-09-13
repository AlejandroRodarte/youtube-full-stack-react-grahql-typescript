import { NonEmptyArray } from 'type-graphql'

import posts from './posts'
import users from './users'
import updoots from './updoots'

const modules: NonEmptyArray<Function> = [
  ...posts,
  ...users,
  ...updoots
]

export default modules
