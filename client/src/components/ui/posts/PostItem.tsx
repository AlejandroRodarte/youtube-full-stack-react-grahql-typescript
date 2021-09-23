import React, { useCallback } from 'react'
import { Flex, Box, Heading, Text } from '@chakra-ui/react'

import Updoot from './Updoot/Updoot'

import { StoreSharedTypes } from '../../../types/context'
import { UITypes } from '../../../types/components/ui'

interface PostItemProps {
  post: StoreSharedTypes.Posts[number]
  vote: (value: UITypes.UpdootVoteValues, postId: number, postCreatedAt: string, cb: (error?: Error) => void) => void
}

const userVoteStatusMap: UITypes.PageItemUserVoteStatusMap = {
  0: 'no-vote',
  1: 'upvoted',
  [-1]: 'downvoted',
  null: 'unknown'
}

const PostItem: React.FC<PostItemProps> = ({ post, vote }: PostItemProps) => {
  const onVote = useCallback((type: UITypes.UpdootVoteTypes, cb: (error?: Error) => void) => {
    switch (type) {
      case 'upvote':
        return vote(1, post.id, post.createdAt, cb)
      case 'downvote':
        return vote(-1, post.id, post.createdAt, cb)
      case 'zero':
        return vote(0, post.id, post.createdAt, cb)
    }
  }, [post.createdAt, post.id, vote])

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
        voteStatus={ userVoteStatusMap[post.userVoteStatus] }
      />
      <Box w="95%">
        <Flex justifyContent="space-between">
          <Heading fontSize="xl">
            { post.title }
          </Heading>
          <Text>
            { post.trendingScore } point{ post.trendingScore === 1 ? '' : 's' } in the last hour
          </Text>
        </Flex>
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
