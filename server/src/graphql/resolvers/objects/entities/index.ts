import { NonEmptyArray } from 'type-graphql'

import post from './post'

const entities: NonEmptyArray<Function> = [
  ...post
]

export default entities
