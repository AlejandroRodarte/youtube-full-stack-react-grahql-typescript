import { Cache } from '@urql/exchange-graphcache'

import ReadPostDtoFragment, { ReadPostDto } from './fragments/post-dto/read'
import WritePostDtoFragment, { WritePostDto } from './fragments/post-dto/write'
import { VoteMutation, MutationVoteArgs } from '../../../../../../../../../../../generated/graphql'

const handleClientMode = (result: VoteMutation, args: MutationVoteArgs, cache: Cache) => {
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

  let deltaPoints = 0

  if (post.userVoteStatus === 0) deltaPoints = args.data.value
  else deltaPoints = -post.userVoteStatus + args.data.value

  cache
    .writeFragment<WritePostDto.Query, WritePostDto.Variables>(
      WritePostDtoFragment,
      {
        __typename: 'PostDto',
        id: args.data.postId,
        points: post.points + deltaPoints,
        userVoteStatus: args.data.value
      }
    )
}

export default handleClientMode
