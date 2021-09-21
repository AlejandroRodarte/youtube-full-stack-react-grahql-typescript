import { NonEmptyArray } from 'type-graphql'

import RootMeResolver from './me-resolver'

const query: NonEmptyArray<Function> = [RootMeResolver]

export default query
