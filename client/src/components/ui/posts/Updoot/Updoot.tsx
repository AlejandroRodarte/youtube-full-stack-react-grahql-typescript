import React, { useCallback, useState, useEffect } from 'react'
import { Flex } from '@chakra-ui/react'
import { IconButton } from '@chakra-ui/button'
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { Text } from '@chakra-ui/layout'

import styles from './Updoot.module.css'

import updootUtils from '../../../../util/components/ui/posts/updoot'

import { UITypes } from '../../../../types/components/ui'
import { Contexts } from '../../../../types/context'

interface StyleState {
  chevronUp: {
    color: string
    iconClasses: string[]
  }
  chevronDown: {
    color: string
    iconClasses: string[]
  }
  points: {
    color: string
    fontWeight: string
  }
}

interface LoadingState {
  chevronUp: boolean
  chevronDown: boolean
}

interface UpdootProps {
  points: Contexts.Posts[number]['points']
  voteStatus: UITypes.UpdootStatus,
  vote: (type: UITypes.UpdootVoteTypes, cb: (error?: Error) => void) => void
}

const Updoot: React.FC<UpdootProps> = ({ points, voteStatus, vote }: UpdootProps) => {
  const [stylesState, setStylesState] = useState<StyleState>({
    chevronUp: {
      color: updootUtils.colors.GRAY,
      iconClasses: []
    },
    chevronDown: {
      color: updootUtils.colors.GRAY,
      iconClasses: []
    },
    points: {
      color: updootUtils.colors.BLACK,
      fontWeight: updootUtils.fontWeights.NORMAL
    }
  })

  const [loadingState, setLoadingState] = useState<LoadingState>({
    chevronUp: false,
    chevronDown: false
  })

  const updateStyles = useCallback((type: UITypes.UpdootVoteTypes) => {
    setStylesState((prevStyleProps) => ({
      ...prevStyleProps,
      chevronUp: {
        ...prevStyleProps.chevronUp,
        iconClasses: type === 'upvote' ? [styles['animate-upvote']] : []
      },
      chevronDown: {
        ...prevStyleProps.chevronDown,
        iconClasses: type === 'downvote' ? [styles['animate-downvote']] : []
      }
    }))
  }, [setStylesState])

  const onVoteSuccess = useCallback((type: UITypes.UpdootVoteTypes) => (error?: Error) => {
    setLoadingState((prevLoadingState) => ({
      ...prevLoadingState,
      chevronUp: false,
      chevronDown: false
    }))

    if (!error) updateStyles(type)
  }, [updateStyles])

  const onUpvote = useCallback(() => {
    if (voteStatus === 'unknown') return

    setLoadingState((prevLoadingState) => ({
      ...prevLoadingState,
      chevronUp: true
    }))

    if (voteStatus === 'upvoted') return vote('zero', onVoteSuccess('zero'))
    return vote('upvote', onVoteSuccess('upvote'))
  }, [onVoteSuccess, voteStatus, vote])

  const onDownvote = useCallback(() => {
    if (voteStatus === 'unknown') return

    setLoadingState((prevLoadingState) => ({
      ...prevLoadingState,
      chevronDown: true
    }))

    if (voteStatus === 'downvoted') return vote('zero', onVoteSuccess('zero'))
    return vote('downvote', onVoteSuccess('downvote'))
  }, [onVoteSuccess, voteStatus, vote])

  useEffect(() => {
    switch (voteStatus) {
      case 'unknown':
      case 'no-vote':
        setStylesState((prevStyleProps) => ({
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
            color: updootUtils.colors.BLACK,
            fontWeight: updootUtils.fontWeights.NORMAL
          }
        }))
        break
      case 'upvoted':
        setStylesState((prevStyleProps) => ({
          ...prevStyleProps,
          chevronUp: {
            ...prevStyleProps.chevronUp,
            color: updootUtils.colors.RED
          },
          chevronDown: {
            ...prevStyleProps.chevronDown,
            color: updootUtils.colors.GRAY
          },
          points: {
            ...prevStyleProps.points,
            color: updootUtils.colors.RED,
            fontWeight: updootUtils.fontWeights.SEMIBOLD
          }
        }))
        break
      case 'downvoted':
        setStylesState((prevStyleProps) => ({
          ...prevStyleProps,
          chevronUp: {
            ...prevStyleProps.chevronUp,
            color: updootUtils.colors.GRAY
          },
          chevronDown: {
            ...prevStyleProps.chevronDown,
            color: updootUtils.colors.BLUE
          },
          points: {
            ...prevStyleProps.points,
            color: updootUtils.colors.BLUE,
            fontWeight: updootUtils.fontWeights.SEMIBOLD
          }
        }))
        break
    }
  }, [voteStatus, setStylesState])

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
        isLoading={ loadingState.chevronUp }
        icon={
          <ChevronUpIcon
            className={ stylesState.chevronUp.iconClasses.join(' ') }
            w={ 6 }
            h={ 6 }
            color={ stylesState.chevronUp.color }
          />
        }
      />
      <Text
        color={ stylesState.points.color }
        fontWeight={ stylesState.points.fontWeight }
      >
        { points }
      </Text>
      <IconButton
        onClick={ onDownvote }
        aria-label="Downvote"
        _focus={ { outline: 'none' } }
        isLoading={ loadingState.chevronDown }
        icon={
          <ChevronDownIcon
            className={ stylesState.chevronDown.iconClasses.join(' ') }
            w={ 6 }
            h={ 6 }
            color={ stylesState.chevronDown.color }
          />
        }
      />
    </Flex>
  )
}

export default Updoot
