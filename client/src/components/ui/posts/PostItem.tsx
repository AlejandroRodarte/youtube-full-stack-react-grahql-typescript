import React, { useCallback } from 'react'
import { Flex, Box, Heading, Text } from '@chakra-ui/react'

import Updoot from './Updoot/Updoot'

import { Contexts } from '../../../types/context'
import { UITypes } from '../../../types/components/ui'

interface PostItemProps {
  post: Contexts.Posts[number]
  vote: (value: UITypes.UpdootVoteValues, postId: number, successHandler: () => void) => void
}

const PostItem: React.FC<PostItemProps> = ({ post, vote }: PostItemProps) => {
  const onVote = useCallback((type: UITypes.UpdootVoteTypes, successHandler: () => void) => {
    switch (type) {
      case 'upvote':
        return vote(1, post.id, successHandler)
      case 'downvote':
        return vote(-1, post.id, successHandler)
      case 'zero':
        return vote(0, post.id, successHandler)
      default:
        return vote(1, post.id, successHandler)
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
        userVoteStatus={ post.userVoteStatus }
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
