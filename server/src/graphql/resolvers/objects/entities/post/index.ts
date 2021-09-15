import { NonEmptyArray } from 'type-graphql'

import TextSnippetResolver from './text-snippet-resolver'
import UserVoteStatusResolver from './user-vote-status-resolver'
import OriginalPosterResolver from './original-poster-resolver'

const fields: NonEmptyArray<Function> = [
  TextSnippetResolver,
  UserVoteStatusResolver,
  OriginalPosterResolver
]

export default fields
