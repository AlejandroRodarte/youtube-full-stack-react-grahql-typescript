import { Cache } from '@urql/exchange-graphcache'

import ReadPostFragment, { ReadPost } from './fragments/read-post'
import WritePostFragment, { WritePost } from './fragments/write-post'
import { VoteMutation, MutationVoteArgs } from '../../../../../../../../../../../generated/graphql'

const handleClientMode = (result: VoteMutation, args: MutationVoteArgs, cache: Cache) => {
  const post =
    cache
      .readFragment<ReadPost.Query, ReadPost.Variables>(
        ReadPostFragment,
        {
          __typename: 'Post',
          id: args.data.postId
        }
      )

  if (!post) return

  let deltaPoints = 0

  if (post.userVoteStatus === 0) deltaPoints = args.data.value
  else deltaPoints = -post.userVoteStatus + args.data.value

  cache
    .writeFragment<WritePost.Query, WritePost.Variables>(
      WritePostFragment,
      {
        __typename: 'Post',
        id: args.data.postId,
        points: post.points + deltaPoints,
        userVoteStatus: args.data.value
      }
    )
}

export default handleClientMode
