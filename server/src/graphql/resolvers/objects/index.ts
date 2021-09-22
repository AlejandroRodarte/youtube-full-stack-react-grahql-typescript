import { NonEmptyArray } from 'type-graphql'

import dtos from './dtos'

const objects: NonEmptyArray<Function> = [
  ...dtos
]

export default objects
