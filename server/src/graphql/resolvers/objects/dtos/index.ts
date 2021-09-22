import { NonEmptyArray } from 'type-graphql'

import postDto from './post-dto'
import updootDto from './updoot-dto'
import userDto from './user-dto'

const dtos: NonEmptyArray<Function> = [
  ...postDto,
  ...updootDto,
  ...userDto
]

export default dtos
