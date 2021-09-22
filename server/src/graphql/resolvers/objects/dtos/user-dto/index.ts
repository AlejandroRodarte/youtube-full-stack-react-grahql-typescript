import { NonEmptyArray } from 'type-graphql'

import UserDtoEmailResolver from './email-resolver'
import UserDtoPostsResolver from './posts-resolver'
import UserDtoUpdootsResolver from './updoots-resolver'

const fields: NonEmptyArray<Function> = [
  UserDtoEmailResolver,
  UserDtoPostsResolver,
  UserDtoUpdootsResolver
]

export default fields
