import React, { useState, useCallback, useEffect } from 'react'
import { withUrqlClient } from 'next-urql'
import { Heading, Flex, Button } from '@chakra-ui/react'
import { Radio, RadioGroup } from '@chakra-ui/radio'
import { Stack } from '@chakra-ui/layout'

import { usePostsQuery, PostsQueryVariables, useLogoutMutation, useVoteMutation, VoteMutationVariables } from '../generated/graphql'

import PostList from '../components/ui/posts/PostList'
import MainLayout from '../layouts/MainLayout'
import withUserData, { UserDataProps } from '../hoc/withUserData'

import { useAppContext } from '../context/app-context'
import nextUrqlClientConfig from '../graphql/urql/next-urql-client-config'
import * as pagesModuleHomeTypes from '../context/store/modules/pages/home/types'

import { StoreSharedTypes } from '../types/context'
import { UITypes } from '../types/components/ui'

interface IndexProps extends UserDataProps {}

const Index: React.FC<IndexProps> = (props: IndexProps) => {
  const { store: { state, dispatch } } = useAppContext()

  const [postsQueryVariables, setPostsQueryVariables] = useState<PostsQueryVariables>({
    postsData: {
      limit: 10,
      sort: state.pages.home.sort,
      timestamp: props.me.timestamp,
      cursor: state.pages.home.cursors[state.pages.home.sort] || null,
      excludeIds: null
    }
  })

  const [{ data, fetching, error }, reexecutePostsQuery] = usePostsQuery({ variables: postsQueryVariables })
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation()
  const [, vote] = useVoteMutation()

  const onLoadMoreClick = useCallback(() => {
    let cursor = ''
    let excludeIds: number[] | null = null

    const posts = state.pages.home.posts[state.pages.home.sort]
    const lastPost = posts[posts.length - 1]

    switch (state.pages.home.sort) {
      case 'new':
        cursor = lastPost.createdAt
        break
      case 'popular': {
        const createdAt = lastPost.createdAt
        const points = state.pages.home.pristine.popular[state.pages.home.pristine.popular.length - 1].points

        cursor = `createdAt=${createdAt},points=${points}`
        excludeIds = state.pages.home.exclude.popular.length === 0
          ? null
          : state.pages.home.exclude.popular.map((post) => post.id)
        break
      }
      case 'trending': {
        const createdAt = lastPost.createdAt
        const points = state.pages.home.pristine.trending[state.pages.home.pristine.trending.length - 1].points
        const trendingScore = lastPost.trendingScore

        cursor = `createdAt=${createdAt},points=${points},trendingScore=${trendingScore}`
        excludeIds = state.pages.home.exclude.trending.length === 0
          ? null
          : state.pages.home.exclude.trending.map((post) => post.id)
        break
      }
    }

    dispatch({
      type: pagesModuleHomeTypes.SET_CURSOR,
      payload: { cursor }
    })

    setPostsQueryVariables((prevPostsQueryInput) => ({
      ...prevPostsQueryInput,
      postsData: {
        ...prevPostsQueryInput.postsData,
        cursor,
        excludeIds
      }
    }))
  }, [
    dispatch,
    state.pages.home.exclude.popular,
    state.pages.home.exclude.trending,
    state.pages.home.posts,
    state.pages.home.pristine.popular,
    state.pages.home.pristine.trending,
    state.pages.home.sort
  ])

  const onTryAgainClick = useCallback(() => {
    reexecutePostsQuery()
  }, [reexecutePostsQuery])

  const onLogout = useCallback(async () => {
    await logout()
  }, [logout])

  const onVote = useCallback(async (value: UITypes.UpdootVoteValues, postId: number, postCreatedAt: string, cb: (error?: Error) => void) => {
    const voteArgsInput: VoteMutationVariables = {
      voteData: {
        postId,
        value
      }
    }

    const response = await vote(voteArgsInput)

    if (response.data) {
      const { message, data } = response.data.vote

      if (data) {
        cb()
        if (
          state.pages.home.sort === 'popular' ||
          state.pages.home.sort === 'trending'
        ) {
          dispatch({
            type: pagesModuleHomeTypes.UPDATE_EXCLUDED_POSTS_FROM_UPDATED_POST,
            payload: {
              post: {
                id: postId,
                points: data.postPoints,
                createdAt: postCreatedAt
              }
            }
          })
        }
        return
      }

      cb(new Error(message))
      return
    }

    cb(new Error('The server is not responding.'))
  }, [
    dispatch,
    state.pages.home.sort,
    vote
  ])

  const onRadioGroupChange = useCallback((sort: string) => {
    const castedSort = sort as StoreSharedTypes.Sort

    dispatch({
      type: pagesModuleHomeTypes.SET_SORT,
      payload: { sort: castedSort }
    })

    setPostsQueryVariables((prevPostsQueryVariables) => ({
      ...prevPostsQueryVariables,
      postsData: {
        ...prevPostsQueryVariables.postsData,
        sort: castedSort,
        cursor: state.pages.home.cursors[castedSort] || null
      }
    }))
  }, [dispatch, state.pages.home.cursors])

  useEffect(() => {
    if (!fetching && data && data.posts.data) {
      dispatch({
        type: pagesModuleHomeTypes.SET_POSTS,
        payload: { posts: data.posts.data.posts }
      })
    }
  }, [data, dispatch, fetching])

  useEffect(() => {
    if (
      (
        state.pages.home.sort === 'popular' ||
        state.pages.home.sort === 'trending'
      ) &&
      data && data.posts.data && data.posts.data.posts.length !== state.pages.home.posts[state.pages.home.sort].length
    ) {
      const newPostsCount = data.posts.data.posts.length - state.pages.home.posts[state.pages.home.sort].length
      const newPristinePosts = data.posts.data.posts.slice(-newPostsCount)

      dispatch({
        type: pagesModuleHomeTypes.ADD_PRISTINE_POSTS,
        payload: { posts: newPristinePosts }
      })

      const lastPost = data.posts.data.posts[data.posts.data.posts.length - 1]

      dispatch({
        type: pagesModuleHomeTypes.UPDATE_EXCLUDED_POSTS_FROM_LAST_FETCHED_POST,
        payload: { post: lastPost }
      })
    }
  }, [
    data,
    dispatch,
    state.pages.home.posts,
    state.pages.home.sort
  ])

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
            value={ state.pages.home.sort }
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
              <Radio
                value="trending"
                size="lg"
              >
                Trending
              </Radio>
            </Stack>
          </RadioGroup>
        </Flex>
        {
          state.pages.home.posts[state.pages.home.sort].length > 0 &&
          <PostList
            posts={ state.pages.home.posts[state.pages.home.sort] }
            vote={ onVote }
          />
        }
        {
          data &&
          data.posts.status === 200 &&
          data.posts.data &&
          data.posts.data.hasMore && (
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
          )
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
