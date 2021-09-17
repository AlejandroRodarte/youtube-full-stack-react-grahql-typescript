import React, { useState, useCallback, useEffect } from 'react'
import { withUrqlClient } from 'next-urql'
import { Heading, Flex, Button } from '@chakra-ui/react'
import { Radio, RadioGroup } from '@chakra-ui/radio'

import { usePostsQuery, PostsQueryVariables, useLogoutMutation, useVoteMutation, VoteMutationVariables } from '../generated/graphql'

import PostList from '../components/ui/posts/PostList'
import MainLayout from '../layouts/MainLayout'
import withUserData, { UserDataProps } from '../hoc/withUserData'

import { useAppContext } from '../context/app-context'

import nextUrqlClientConfig from '../graphql/urql/next-urql-client-config'
import { UITypes } from '../types/components/ui'
import { Stack } from '@chakra-ui/layout'
import { Contexts } from '../types/context'

interface IndexProps extends UserDataProps {}

const Index: React.FC<IndexProps> = (props: IndexProps) => {
  const { pages: { home } } = useAppContext()

  const [postsQueryVariables, setPostsQueryVariables] = useState<PostsQueryVariables>({
    postsData: {
      limit: 10,
      sort: home.sort.value,
      cursor: home.cursors[home.sort.value].value
    }
  })

  const [{ data, fetching, error }, reexecutePostsQuery] = usePostsQuery({ variables: postsQueryVariables })
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation()
  const [, vote] = useVoteMutation()

  const onLoadMoreClick = useCallback(() => {
    let cursor = ''
    const posts = home.posts[home.sort.value].value
    const lastPost = posts[posts.length - 1]

    switch (home.sort.value) {
      case 'new':
        cursor = lastPost.createdAt
        home.cursors.new.set(() => cursor)
        break
      case 'popular': {
        const createdAt = lastPost.createdAt
        const points = home.pristine.popular.points.value
        cursor = `createdAt=${createdAt},points=${points}`
        home.cursors.popular.set(() => cursor)
        break
      }
    }

    setPostsQueryVariables((prevPostsQueryInput) => ({
      ...prevPostsQueryInput,
      postsData: {
        ...prevPostsQueryInput.postsData,
        cursor
      }
    }))
  }, [home.cursors.new, home.cursors.popular, home.posts, home.pristine.popular.points, home.sort.value])

  const onTryAgainClick = useCallback(() => {
    reexecutePostsQuery()
  }, [reexecutePostsQuery])

  const onLogout = useCallback(async () => {
    await logout()
  }, [logout])

  const onVote = useCallback(async (value: UITypes.UpdootVoteValues, postId: number, successHandler: () => void) => {
    const voteArgsInput: VoteMutationVariables = {
      voteData: {
        postId,
        value
      }
    }

    const response = await vote(voteArgsInput)

    if (response.data) {
      const { data } = response.data.vote
      if (data) successHandler()
    }
  }, [vote])

  const onRadioGroupChange = useCallback((sort: string) => {
    const castedSort = sort as Contexts.Sort
    home.sort.set(() => castedSort)

    setPostsQueryVariables((prevPostsQueryVariables) => ({
      ...prevPostsQueryVariables,
      postsData: {
        ...prevPostsQueryVariables.postsData,
        sort: castedSort,
        cursor: home.cursors[castedSort].value
      }
    }))
  }, [home.cursors, home.sort])

  useEffect(() => {
    if (!fetching && data && data.posts.data) {
      home.posts[home.sort.value].set(() => data.posts.data.posts)

      if (
        home.sort.value === 'popular' &&
        data.posts.data.posts.length !== home.posts[home.sort.value].value.length
      ) {
        const lastPost = data.posts.data.posts[data.posts.data.posts.length - 1]
        home.pristine.popular.points.set(() => lastPost.points)
      }
    }
  }, [data, fetching, home.posts, home.pristine.popular.points, home.sort.value])

  return (
    <>
      <MainLayout
        variant="regular"
        me={ props.me }
        logout={
          {
            handler: onLogout,
            loading: logoutFetching
          }
        }
      >
        <Flex
          direction="row"
          alignItems="center"
        >
          <Heading mr={ 5 }>
            LiReddit
          </Heading>
          <RadioGroup
            onChange={ onRadioGroupChange }
            value={ home.sort.value }
          >
            <Stack
              direction="row"
              spacing={ 8 }
            >
              <Radio
                value="new"
                size="lg"
              >
                New
              </Radio>
              <Radio
                value="popular"
                size="lg"
              >
                Popular
              </Radio>
            </Stack>
          </RadioGroup>
        </Flex>
        {
          home.posts[home.sort.value].value.length > 0 &&
          <PostList
            posts={ home.posts[home.sort.value].value }
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
