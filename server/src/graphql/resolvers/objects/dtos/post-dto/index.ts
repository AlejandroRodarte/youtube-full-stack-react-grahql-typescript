import { NonEmptyArray } from 'type-graphql'

import PostDtoTextSnippetResolver from './text-snippet-resolver'
import PostDtoUserVoteStatusResolver from './user-vote-status-resolver'
import PostDtoOriginalPosterResolver from './original-poster-resolver'
import PostDtoUpdootsResolver from './updoots-resolver'

const fields: NonEmptyArray<Function> = [
  PostDtoTextSnippetResolver,
  PostDtoUserVoteStatusResolver,
  PostDtoOriginalPosterResolver,
  PostDtoUpdootsResolver
]

export default fields
