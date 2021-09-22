import { Cache } from '@urql/exchange-graphcache'

import ReadPostDtoFragment, { ReadPostDto } from './fragments/post-dto/read'
import WritePostDtoFragment, { WritePostDto } from './fragments/post-dto/write'
import { VoteMutation, MutationVoteArgs } from '../../../../../../../../../../../generated/graphql'

const handleServerMode = (result: VoteMutation, args: MutationVoteArgs, cache: Cache) => {
  const post =
    cache
      .readFragment<ReadPostDto.Query, ReadPostDto.Variables>(
        ReadPostDtoFragment,
        {
          __typename: 'PostDto',
          id: args.data.postId
        }
      )

  if (!post) return

  cache
    .writeFragment<WritePostDto.Query, WritePostDto.Variables>(
      WritePostDtoFragment,
      {
        __typename: 'PostDto',
        id: args.data.postId,
        points: result.vote.data.postPoints,
        userVoteStatus: args.data.value
      }
    )
}

export default handleServerMode
