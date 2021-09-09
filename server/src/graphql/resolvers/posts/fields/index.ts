import { NonEmptyArray } from 'type-graphql'
import TextSnippetResolver from './text-snippet-resolver'

const fields: NonEmptyArray<Function> = [
  TextSnippetResolver
]

export default fields
