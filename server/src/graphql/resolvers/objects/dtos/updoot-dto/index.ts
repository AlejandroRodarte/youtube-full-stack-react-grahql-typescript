import { NonEmptyArray } from 'type-graphql'

import UpdootDtoUserResolver from './user-resolver'
import UpdootDtoPostResolver from './post-resolver'

const fields: NonEmptyArray<Function> = [
  UpdootDtoUserResolver,
  UpdootDtoPostResolver
]

export default fields
