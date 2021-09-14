import React, { useCallback } from 'react'
import { Flex, Box, Heading, Text } from '@chakra-ui/react'

import Updoot from './Updoot'

import { Contexts } from '../../../types/context'
import { UITypes } from '../../../types/components/ui'

interface PostItemProps {
  post: Contexts.Posts[number]
  vote: (value: UITypes.UpdootVoteValues, postId: number) => void
}

const PostItem: React.FC<PostItemProps> = ({ post, vote }: PostItemProps) => {
  const onVote = useCallback((type: UITypes.UpdootVoteTypes) => {
    switch (type) {
      case 'upvote':
        return vote(1, post.id)
      case 'downvote':
        return vote(-1, post.id)
      default:
        return vote(1, post.id)
    }
  }, [post.id, vote])

  return (
    <Flex
      key={ post.id }
      p={ 5 }
      shadow="md"
      borderWidth="1px"
    >
      <Updoot
        points={ post.points }
        vote={ onVote }
      />
      <Box>
        <Heading fontSize="xl">
          { post.title }
        </Heading>
        <Text mt={ 4 }>
          Posted by: { post.originalPoster.username }
        </Text>
        <Text mt={ 4 }>
          { post.textSnippet }
        </Text>
      </Box>
    </Flex>
  )
}

export default PostItem
