import { NonEmptyArray } from 'type-graphql'

import RootAddPostResolver from './add-post-resolver'
import RootEditPostResolver from './edit-post-resolver'
import RootDeletePostResolver from './delete-post-resolver'

const mutation: NonEmptyArray<Function> = [
  RootAddPostResolver,
  RootEditPostResolver,
  RootDeletePostResolver
]

export default mutation
