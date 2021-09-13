import { NonEmptyArray } from 'type-graphql'

import mutation from './mutation'

const updoots: NonEmptyArray<Function> = [
  ...mutation
]

export default updoots
