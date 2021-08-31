import { NonEmptyArray } from 'type-graphql'

import AddPostResolver from './add-post-resolver'
import EditPostResolver from './edit-post-resolver'
import DeletePostResolver from './delete-post-resolver'

const mutation: NonEmptyArray<Function> = [
  AddPostResolver,
  EditPostResolver,
  DeletePostResolver
]

export default mutation
