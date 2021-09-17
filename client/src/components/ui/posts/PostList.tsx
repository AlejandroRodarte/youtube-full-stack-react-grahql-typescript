import React, { useCallback } from 'react'
import { Stack } from '@chakra-ui/layout'

import PostItem from './PostItem'

import { Contexts } from '../../../types/context'
import { UITypes } from '../../../types/components/ui'

interface PostListProps {
  posts: Contexts.Posts
  vote: (value: UITypes.UpdootVoteValues, postId: number, cb: (error?: Error) => void) => void
}

const PostList: React.FC<PostListProps> = ({ posts, vote }: PostListProps) => {
  const onVote = useCallback((value: UITypes.UpdootVoteValues, postId: number, cb: (error?: Error) => void) => {
    vote(value, postId, cb)
  }, [vote])

  return (
    <Stack spacing={ 8 }>
      {
        posts.map(
          (post) =>
            <PostItem
              key={ post.id }
              post={ post }
              vote={ onVote }
            />
        )
      }
    </Stack>
  )
}

export default PostList
