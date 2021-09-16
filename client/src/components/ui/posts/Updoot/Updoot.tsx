import React, { useCallback, useState, useEffect } from 'react'
import { Flex } from '@chakra-ui/react'
import { IconButton } from '@chakra-ui/button'
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { Text } from '@chakra-ui/layout'

import styles from './Updoot.module.css'

import updootUtils from '../../../../util/components/ui/posts/updoot'

import { UITypes } from '../../../../types/components/ui'
import { Contexts } from '../../../../types/context'

interface UpdootProps {
  points: Contexts.Posts[number]['points']
  userVoteStatus: Contexts.Posts[number]['userVoteStatus']
  vote: (type: UITypes.UpdootVoteTypes, successHandler: () => void) => void
}

const Updoot: React.FC<UpdootProps> = ({ points, userVoteStatus, vote }: UpdootProps) => {
  const [styleProps, setStyleProps] = useState({
    chevronUp: {
      color: updootUtils.colors.GRAY,
      iconClasses: []
    },
    chevronDown: {
      color: updootUtils.colors.GRAY,
      iconClasses: []
    },
    points: {
      color: 'black',
      weight: 'normal'
    }
  })

  const updateStyles = useCallback((type: UITypes.UpdootVoteTypes) => {
    setStyleProps((prevStyleProps) => ({
      ...prevStyleProps,
      chevronUp: {
        ...prevStyleProps.chevronUp,
        iconClasses: type === 'upvote' ? [styles['animate-upvote']] : []
      },
      chevronDown: {
        ...prevStyleProps.chevronDown,
        iconClasses: type === 'downvote' ? [styles['animate-downvote']] : []
      },
      points: {
        ...prevStyleProps.points,
        color: type === 'zero' ? 'black' : (type === 'upvote' ? updootUtils.colors.RED : updootUtils.colors.BLUE),
        weight: type === 'zero' ? 'normal' : 'semibold'
      }
    }))
  }, [setStyleProps])

  const onVoteSuccess = useCallback((type: UITypes.UpdootVoteTypes) => () => {
    updateStyles(type)
  }, [updateStyles])

  const onUpvote = useCallback(() => {
    if (userVoteStatus === null) return
    if (userVoteStatus === 1) return vote('zero', onVoteSuccess('zero'))
    return vote('upvote', onVoteSuccess('upvote'))
  }, [onVoteSuccess, userVoteStatus, vote])

  const onDownVote = useCallback(() => {
    if (userVoteStatus === null) return
    if (userVoteStatus === -1) return vote('zero', onVoteSuccess('zero'))
    return vote('downvote', onVoteSuccess('downvote'))
  }, [onVoteSuccess, userVoteStatus, vote])

  useEffect(() => {
    switch (userVoteStatus) {
      case null:
      case 0:
        setStyleProps((prevStyleProps) => ({
          ...prevStyleProps,
          chevronUp: {
            ...prevStyleProps.chevronUp,
            color: updootUtils.colors.GRAY
          },
          chevronDown: {
            ...prevStyleProps.chevronDown,
            color: updootUtils.colors.GRAY
          },
          points: {
            ...prevStyleProps.points,
            color: 'black',
            weight: 'normal'
          }
        }))
        break
      case 1:
        setStyleProps((prevStyleProps) => ({
          ...prevStyleProps,
          chevronUp: {
            ...prevStyleProps.chevronUp,
            color: updootUtils.colors.RED
          },
          chevronDown: {
            ...prevStyleProps.chevronDown,
            color: updootUtils.colors.GRAY
          }
        }))
        break
      case -1:
        setStyleProps((prevStyleProps) => ({
          ...prevStyleProps,
          chevronUp: {
            ...prevStyleProps.chevronUp,
            color: updootUtils.colors.GRAY
          },
          chevronDown: {
            ...prevStyleProps.chevronDown,
            color: updootUtils.colors.BLUE
          }
        }))
        break
    }
  }, [userVoteStatus, setStyleProps])

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
        _focus={ { outline: 'none' } }
        icon={
          <ChevronUpIcon
            className={ styleProps.chevronUp.iconClasses.join(' ') }
            w={ 6 }
            h={ 6 }
            color={ styleProps.chevronUp.color }
          />
        }
      />
      <Text
        color={ styleProps.points.color }
        fontWeight={ styleProps.points.weight }
      >
        { points }
      </Text>
      <IconButton
        onClick={ onDownVote }
        aria-label="Downvote"
        _focus={ { outline: 'none' } }
        icon={
          <ChevronDownIcon
            className={ styleProps.chevronDown.iconClasses.join(' ') }
            w={ 6 }
            h={ 6 }
            color={ styleProps.chevronDown.color }
          />
        }
      />
    </Flex>
  )
}

export default Updoot
