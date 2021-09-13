import { NonEmptyArray } from 'type-graphql'

import entities from './entities'

const objects: NonEmptyArray<Function> = [
  ...entities
]

export default objects
