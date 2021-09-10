import { NonEmptyArray } from 'type-graphql'

import modules from './modules'

const root: NonEmptyArray<Function> = [
  ...modules
]

export default root
