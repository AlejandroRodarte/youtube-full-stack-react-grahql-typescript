import React, { useCallback } from 'react'
import { Flex } from '@chakra-ui/react'
import { IconButton } from '@chakra-ui/button'
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'

import { UITypes } from '../../../types/components/ui'
import { Contexts } from '../../../types/context'

interface UpdootProps {
  points: Contexts.Posts[number]['points']
  userVoteStatus: Contexts.Posts[number]['userVoteStatus']
  vote: (type: UITypes.UpdootVoteTypes) => void
}

const Updoot: React.FC<UpdootProps> = ({ points, userVoteStatus, vote }: UpdootProps) => {
  const onUpvote = useCallback(() => {
    if (userVoteStatus === null) return
    if (userVoteStatus === 1) return vote('zero')
    return vote('upvote')
  }, [userVoteStatus, vote])

  const onDownVote = useCallback(() => {
    if (userVoteStatus === null) return
    if (userVoteStatus === -1) return vote('zero')
    return vote('downvote')
  }, [userVoteStatus, vote])

  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      mr={ 4 }
    >
      <IconButton
        onClick={ onUpvote }
        aria-label="Upvote"
        icon={
          <ChevronUpIcon
            w={ 6 }
            h={ 6 }
            color={ userVoteStatus !== null && userVoteStatus === 1 ? 'red.500' : 'gray.500' }
          />
        }
      />
      { points }
      <IconButton
        onClick={ onDownVote }
        aria-label="Downvote"
        icon={
          <ChevronDownIcon
            w={ 6 }
            h={ 6 }
            color={ userVoteStatus !== null && userVoteStatus === -1 ? 'blue.500' : 'gray.500' }
          />
        }
      />
    </Flex>
  )
}

export default Updoot
