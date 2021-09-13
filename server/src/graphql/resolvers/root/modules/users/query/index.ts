import { NonEmptyArray } from 'type-graphql'

import MeResolver from './me-resolver'

const query: NonEmptyArray<Function> = [MeResolver]

export default query
