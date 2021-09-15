import { NonEmptyArray } from 'type-graphql'
import TextSnippetResolver from './text-snippet-resolver'
import UserVoteStatusResolver from './user-vote-status-resolver'

const fields: NonEmptyArray<Function> = [
  TextSnippetResolver,
  UserVoteStatusResolver
]

export default fields
