import React, { useState, useCallback, useEffect } from 'react'
import { withUrqlClient } from 'next-urql'
import { Box, Heading, Text, Flex, Button } from '@chakra-ui/react'
import { Stack } from '@chakra-ui/layout'

import { usePostsQuery, PostsQueryVariables, useLogoutMutation } from '../generated/graphql'

import MainLayout from '../layouts/MainLayout'
import withUserData, { UserDataProps } from '../hoc/withUserData'

import { useAppContext } from '../context/app-context'

import nextUrqlClientConfig from '../graphql/urql/next-urql-client-config'

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

  const onLogout = useCallback(() => {
    logout()
  }, [logout])

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
        <Stack spacing={ 8 }>
          {
            posts.length > 0 && posts.map(
              (post) => (
                <Box
                  key={ post.id }
                  p={ 5 }
                  shadow="md"
                  borderWidth="1px"
                >
                  <Heading fontSize="xl">
                    { post.title } : { post.points }
                  </Heading>
                  <Text mt={ 4 }>
                    Posted by: { post.originalPoster.username }
                  </Text>
                  <Text mt={ 4 }>
                    { post.textSnippet }
                  </Text>
                </Box>
              )
            )
          }
        </Stack>
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
