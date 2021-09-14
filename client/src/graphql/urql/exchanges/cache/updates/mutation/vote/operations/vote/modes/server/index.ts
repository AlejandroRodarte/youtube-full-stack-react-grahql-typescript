import { Cache } from '@urql/exchange-graphcache'

import ReadPostFragment, { ReadPost } from './fragments/read-post'
import WritePostFragment, { WritePost } from './fragments/write-post'
import { VoteMutation, MutationVoteArgs } from '../../../../../../../../../../../generated/graphql'

const handleServerMode = (result: VoteMutation, args: MutationVoteArgs, cache: Cache) => {
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

  cache
    .writeFragment<WritePost.Query, WritePost.Variables>(
      WritePostFragment,
      {
        __typename: 'Post',
        id: args.data.postId,
        points: result.vote.data.postPoints
      }
    )
}

export default handleServerMode
