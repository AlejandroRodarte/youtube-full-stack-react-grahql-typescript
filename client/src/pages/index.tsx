import React, { useState, useCallback, useEffect } from 'react'
import { withUrqlClient } from 'next-urql'
import { Heading, Flex, Button } from '@chakra-ui/react'
import { Radio, RadioGroup } from '@chakra-ui/radio'
import { Stack } from '@chakra-ui/layout'

import { usePostsQuery, PostsQueryVariables, useLogoutMutation, useVoteMutation, VoteMutationVariables, PostsQuery } from '../generated/graphql'

import PostList from '../components/ui/posts/PostList'
import MainLayout from '../layouts/MainLayout'
import withUserData, { UserDataProps } from '../hoc/withUserData'
import connect, { MapDispatchToPropsFunction, MapStateToPropsFunction } from '../hoc/connect'

import nextUrqlClientConfig from '../graphql/urql/next-urql-client-config'
import * as pagesModuleHomeTypes from '../context/store/modules/pages/home/types'

import { Store, StoreSharedTypes } from '../types/context'
import { UITypes } from '../types/components/ui'

interface StateProps {
  sort: Store.State['pages']['home']['sort']
  cursors: Store.State['pages']['home']['cursors']
  posts: Store.State['pages']['home']['posts'],
  timestamps: Store.State['pages']['home']['timestamps']
  pristine: {
    popular: {
      lastPostPoints: number
    }
    trending: {
      lastPostPoints: number
    }
  }
  ids: Store.State['pages']['home']['ids']
}

interface DispatchProps {
  onSetCursor: (cursor: string) => void
  onSetSort: (sort: StoreSharedTypes.Sort) => void
  onSetPosts: (posts: PostsQuery['posts']['data']['posts']) => void
  onSetTimestamp: (timestamp: string) => void
  onAddIds: (ids: number[]) => void
  onSetPreviousArgs: () => void
  onAddPristinePosts: (posts: PostsQuery['posts']['data']['posts']) => void
}

type AdditionalIndexProps = UserDataProps & StateProps & DispatchProps
interface IndexProps extends AdditionalIndexProps {}

const mapStateToProps: MapStateToPropsFunction<StateProps, IndexProps> = (state, _) => ({
  sort: state.pages.home.sort,
  cursors: state.pages.home.cursors,
  posts: state.pages.home.posts,
  timestamps: state.pages.home.timestamps,
  pristine: {
    popular: {
      lastPostPoints:
        state.pages.home.pristine.popular.length === 0
          ? 0
          : state.pages.home.pristine.popular[state.pages.home.pristine.popular.length - 1].points
    },
    trending: {
      lastPostPoints:
        state.pages.home.pristine.trending.length === 0
          ? 0
          : state.pages.home.pristine.trending[state.pages.home.pristine.trending.length - 1].points
    }
  },
  ids: state.pages.home.ids
})

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, IndexProps> = (dispatch: React.Dispatch<Store.Actions>, _: IndexProps): DispatchProps => ({
  onSetCursor: (cursor) => dispatch({ type: pagesModuleHomeTypes.SET_CURSOR, payload: { cursor } }),
  onSetSort: (sort) => dispatch({ type: pagesModuleHomeTypes.SET_SORT, payload: { sort } }),
  onSetPosts: (posts) => dispatch({ type: pagesModuleHomeTypes.SET_POSTS, payload: { posts } }),
  onSetTimestamp: (timestamp) => dispatch({ type: pagesModuleHomeTypes.SET_TIMESTAMP, payload: { timestamp } }),
  onAddIds: (ids) => dispatch({ type: pagesModuleHomeTypes.ADD_IDS, payload: { ids } }),
  onSetPreviousArgs: () => dispatch({ type: pagesModuleHomeTypes.SET_PREVIOUS_ARGS }),
  onAddPristinePosts: (posts) => dispatch({ type: pagesModuleHomeTypes.ADD_PRISTINE_POSTS, payload: { posts } })
})

const Index: React.FC<IndexProps> = ({
  me,
  sort,
  posts,
  timestamps,
  pristine,
  cursors,
  ids,
  onSetSort,
  onSetCursor,
  onSetPosts,
  onSetTimestamp,
  onAddIds,
  onSetPreviousArgs,
  onAddPristinePosts
}: IndexProps) => {
  // use previous timestamp/ids to avoid retriggering cache
  const [postsQueryVariables, setPostsQueryVariables] = useState<PostsQueryVariables>({
    postsData: {
      limit: 10,
      sort,
      cursor: cursors[sort] || null,
      timestamp: timestamps.previous[sort] || null,
      ids: ids.previous[sort].length === 0 ? null : ids.previous[sort]
    }
  })

  const [{ data, fetching, error }, reexecutePostsQuery] = usePostsQuery({ variables: postsQueryVariables })
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation()
  const [, vote] = useVoteMutation()

  const onLoadMoreClick = useCallback(() => {
    let cursor = ''
    const lastPost = posts[sort][posts[sort].length - 1]

    // sort-based cursor computation
    // for popular/trending, set points cursor based off the last post's original (pristine) value
    switch (sort) {
      case 'new':
        cursor = lastPost.createdAt
        break
      case 'popular': {
        const createdAt = lastPost.createdAt
        cursor = `createdAt=${createdAt},points=${pristine.popular.lastPostPoints}`
        break
      }
      case 'trending': {
        const createdAt = lastPost.createdAt
        const trendingScore = lastPost.trendingScore
        cursor = `createdAt=${createdAt},points=${pristine.trending.lastPostPoints},trendingScore=${trendingScore}`
        break
      }
    }

    onSetCursor(cursor)

    // set cursor and current timestamp/ids args to trigger cache
    setPostsQueryVariables((prevPostsQueryInput) => ({
      ...prevPostsQueryInput,
      postsData: {
        ...prevPostsQueryInput.postsData,
        cursor,
        timestamp: timestamps.current[sort] || null,
        ids: ids.current[sort].length === 0 ? null : ids.current[sort]
      }
    }))
  }, [
    ids,
    onSetCursor,
    posts,
    pristine.popular.lastPostPoints,
    pristine.trending.lastPostPoints,
    sort,
    timestamps
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
      if (data) return cb()
      return cb(new Error(message))
    }

    cb(new Error('The server is not responding.'))
  }, [vote])

  const onRadioGroupChange = useCallback((sort: string) => {
    const castedSort = sort as StoreSharedTypes.Sort
    onSetSort(castedSort)

    // changing sort mode should not retrigger cache, so use previous timestamp/ids args
    setPostsQueryVariables((prevPostsQueryVariables) => ({
      ...prevPostsQueryVariables,
      postsData: {
        ...prevPostsQueryVariables.postsData,
        sort: castedSort,
        cursor: cursors[castedSort] || null,
        timestamp: timestamps.previous[castedSort] || null,
        ids: ids.previous[castedSort].length === 0 ? null : ids.previous[castedSort]
      }
    }))
  }, [
    onSetSort,
    cursors,
    ids.previous,
    timestamps.previous
  ])

  // triggers when cache changes (new posts arrive from server, post.userVoteStatus & post.points change due to user voting)
  useEffect(() => {
    if (!fetching && data && data.posts.data) onSetPosts(data.posts.data.posts)
  }, [
    data,
    fetching,
    onSetPosts
  ])

  // triggers when we succesfully fetch data from the server
  useEffect(() => {
    if (
      !fetching &&
      data &&
      data.posts.data &&
      data.posts.data.posts.length - posts[sort].length === postsQueryVariables.postsData.limit
    ) {
      // migrate current timestamp/ids args to previous to avoid triggering cache
      onSetPreviousArgs()

      // get new posts
      const newPostsCount = data.posts.data.posts.length - posts[sort].length
      const newPristinePosts = data.posts.data.posts.slice(-newPostsCount)

      // set pristine post values (points) to set unaltered cursor in the future and ids
      if (sort === 'popular' || sort === 'trending') {
        onAddPristinePosts(newPristinePosts)
        onAddIds(newPristinePosts.map((post) => post.id))
      }

      // set timestamp to know when we fetched this posts page
      onSetTimestamp(data.posts.timestamp)
    }
  }, [
    data,
    fetching,
    onAddIds,
    onAddPristinePosts,
    onSetPreviousArgs,
    onSetTimestamp,
    posts,
    postsQueryVariables.postsData.limit,
    sort
  ])

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
        <Flex
          direction="row"
          alignItems="center"
        >
          <Heading mr={ 5 }>
            LiReddit
          </Heading>
          <RadioGroup
            onChange={ onRadioGroupChange }
            value={ sort }
          >
            <Stack
              direction="row"
              spacing={ 4 }
            >
              <Radio
                value="new"
                size="md"
              >
                New
              </Radio>
              <Radio
                value="popular"
                size="md"
              >
                Popular
              </Radio>
              <Radio
                value="trending"
                size="md"
              >
                Trending
              </Radio>
            </Stack>
          </RadioGroup>
        </Flex>
        {
          posts[sort].length > 0 && (
            <PostList
              posts={ posts[sort] }
              vote={ onVote }
            />
          )
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

export default withUrqlClient(nextUrqlClientConfig, { ssr: true })(withUserData(connect(mapStateToProps, mapDispatchToProps)(Index)))
