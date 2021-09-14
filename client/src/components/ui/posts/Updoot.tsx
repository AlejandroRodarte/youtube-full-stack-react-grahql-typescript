import React, { useCallback } from 'react'
import { Flex } from '@chakra-ui/react'
import { IconButton } from '@chakra-ui/button'
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'

import { UITypes } from '../../../types/components/ui'

interface UpdootProps {
  points: number
  vote: (type: UITypes.UpdootVoteTypes) => void
}

const Updoot: React.FC<UpdootProps> = ({ points, vote }: UpdootProps) => {
  const onUpvote = useCallback(() => vote('upvote'), [vote])
  const onDownVote = useCallback(() => vote('downvote'), [vote])

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
            color="red.500"
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
            color="blue.500"
          />
        }
      />
    </Flex>
  )
}

export default Updoot
