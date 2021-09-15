import React, { useState, useCallback, useEffect } from 'react'
import { withUrqlClient } from 'next-urql'
import { Heading, Flex, Button } from '@chakra-ui/react'

import { usePostsQuery, PostsQueryVariables, useLogoutMutation, useVoteMutation, VoteMutationVariables } from '../generated/graphql'

import PostList from '../components/ui/posts/PostList'
import MainLayout from '../layouts/MainLayout'
import withUserData, { UserDataProps } from '../hoc/withUserData'

import { useAppContext } from '../context/app-context'

import nextUrqlClientConfig from '../graphql/urql/next-urql-client-config'
import { UITypes } from '../types/components/ui'

interface IndexProps extends UserDataProps {}

const Index: React.FC<IndexProps> = ({ me }: IndexProps) => {
  const [postsQueryVariables, setPostsQueryVariables] = useState<PostsQueryVariables>({
    postsData: {
      limit: 10,
      sort: 'new'
    }
  })

  const { posts, setPosts } = useAppContext()

  const [{ data, fetching, error }, reexecutePostsQuery] = usePostsQuery({ variables: postsQueryVariables })
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation()
  const [, vote] = useVoteMutation()

  const onLoadMoreClick = useCallback(() => {
    setPostsQueryVariables((prevPostsQueryInput) => ({
      ...prevPostsQueryInput,
      postsData: {
        ...prevPostsQueryInput.postsData,
        cursor: posts[posts.length - 1].createdAt
      }
    }))
  }, [posts])

  const onTryAgainClick = useCallback(() => {
    reexecutePostsQuery()
  }, [reexecutePostsQuery])

  const onLogout = useCallback(async () => {
    await logout()
  }, [logout])

  const onVote = useCallback(async (value: UITypes.UpdootVoteValues, postId: number) => {
    const voteArgsInput: VoteMutationVariables = {
      voteData: {
        postId,
        value
      }
    }

    await vote(voteArgsInput)
  }, [vote])

  useEffect(() => {
    if (data && data.posts.data) setPosts(() => data.posts.data.posts)
  }, [data, setPosts])

  return (
    <>
      <MainLayout
        variant="regular"
        me={ me }
        logout={
          {
            handler: onLogout,
            loading: logoutFetching
          }
        }
      >
        <Flex>
          <Heading>
            LiReddit
          </Heading>
        </Flex>
        {
          posts.length > 0 &&
          <PostList
            posts={ posts }
            vote={ onVote }
          />
        }
        {
          data &&
          data.posts.status === 200 &&
          data.posts.data &&
          data.posts.data.hasMore &&
          <Flex>
            <Button
              my={ 8 }
              m="auto"
              isLoading={ fetching }
              onClick={ onLoadMoreClick }
            >
              Load more
            </Button>
          </Flex>
        }
        {
          ((data && data.posts.status === 400) || error) && (
            <>
              <Flex>
                <Button
                  my={ 8 }
                  m="auto"
                  isLoading={ fetching }
                  onClick={ onTryAgainClick }
                >
                  Try again
                </Button>
              </Flex>
            </>
          )
        }
      </MainLayout>
    </>
  )
}

export default withUrqlClient(nextUrqlClientConfig, { ssr: true })(withUserData(Index))
