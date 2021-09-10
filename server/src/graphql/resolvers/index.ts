import { NonEmptyArray } from 'type-graphql'

import root from './root'
import objects from './objects'

const resolvers: NonEmptyArray<Function> = [
  ...root,
  ...objects
]

export default resolvers
