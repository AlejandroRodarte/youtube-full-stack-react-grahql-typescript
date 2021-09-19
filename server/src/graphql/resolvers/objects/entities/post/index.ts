import { NonEmptyArray } from 'type-graphql'

import TextSnippetResolver from './text-snippet-resolver'
import UserVoteStatusResolver from './user-vote-status-resolver'
import OriginalPosterResolver from './original-poster-resolver'
import TrendingScoreResolver from './trending-score-resolver'

const fields: NonEmptyArray<Function> = [
  TextSnippetResolver,
  UserVoteStatusResolver,
  OriginalPosterResolver,
  TrendingScoreResolver
]

export default fields
