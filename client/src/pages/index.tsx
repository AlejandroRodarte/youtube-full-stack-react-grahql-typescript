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
  pristine: {
    popular: {
      lastPostPoints: number
    }
    trending: {
      lastPostPoints: number
    }
  }
  excludeIds: {
    current: {
      popular: number[],
      trending: number[]
    },
    previous: Store.State['pages']['home']['excludeIds']['previous']
  }
}

interface DispatchProps {
  onSetCursor: (cursor: string) => void
  onUpdateExcludedPostsFromUpdatedPost: (post: StoreSharedTypes.ExcludedPost) => void
  onSetSort: (sort: StoreSharedTypes.Sort) => void
  onSetPosts: (posts: PostsQuery['posts']['data']['posts']) => void
  onAddPristinePosts: (posts: PostsQuery['posts']['data']['posts']) => void
  onUpdateExcludedPostsFromLastFetchedPost: (post: PostsQuery['posts']['data']['posts'][number]) => void
  onSetCurrentExcludedIds: () => void
}

type AdditionalIndexProps = UserDataProps & StateProps & DispatchProps
interface IndexProps extends AdditionalIndexProps {}

const mapStateToProps: MapStateToPropsFunction<StateProps, IndexProps> = (state, _) => ({
  sort: state.pages.home.sort,
  cursors: state.pages.home.cursors,
  posts: state.pages.home.posts,
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
  excludeIds: {
    current: {
      popular: state.pages.home.excludeIds.current.popular.map((post) => post.id),
      trending: state.pages.home.excludeIds.current.trending.map((post) => post.id)
    },
    previous: state.pages.home.excludeIds.previous
  }
})

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, IndexProps> = (dispatch: React.Dispatch<Store.Actions>, _: IndexProps): DispatchProps => ({
  onSetCursor: (cursor) => dispatch({ type: pagesModuleHomeTypes.SET_CURSOR, payload: { cursor } }),
  onUpdateExcludedPostsFromUpdatedPost: (post) => dispatch({ type: pagesModuleHomeTypes.UPDATE_EXCLUDED_POSTS_FROM_UPDATED_POST, payload: { post } }),
  onSetSort: (sort) => dispatch({ type: pagesModuleHomeTypes.SET_SORT, payload: { sort } }),
  onSetPosts: (posts) => dispatch({ type: pagesModuleHomeTypes.SET_POSTS, payload: { posts } }),
  onAddPristinePosts: (posts) => dispatch({ type: pagesModuleHomeTypes.ADD_PRISTINE_POSTS, payload: { posts } }),
  onUpdateExcludedPostsFromLastFetchedPost: (post) => dispatch({ type: pagesModuleHomeTypes.UPDATE_EXCLUDED_POSTS_FROM_LAST_FETCHED_POST, payload: { post } }),
  onSetCurrentExcludedIds: () => dispatch({ type: pagesModuleHomeTypes.SET_CURRENT_EXCLUDED_IDS })
})

const Index: React.FC<IndexProps> = ({
  me,
  sort,
  posts,
  pristine,
  cursors,
  excludeIds,
  onSetSort,
  onSetCursor,
  onAddPristinePosts,
  onUpdateExcludedPostsFromLastFetchedPost,
  onSetPosts,
  onUpdateExcludedPostsFromUpdatedPost,
  onSetCurrentExcludedIds
}: IndexProps) => {
  const [postsQueryVariables, setPostsQueryVariables] = useState<PostsQueryVariables>({
    postsData: {
      limit: 10,
      sort,
      timestamp: me.timestamp,
      cursor: cursors[sort] || null,
      excludeIds:
        sort === 'new'
          ? null
          : excludeIds.previous[sort].length === 0
            ? null
            : excludeIds.previous[sort]
    }
  })

  const [{ data, fetching, error }, reexecutePostsQuery] = usePostsQuery({ variables: postsQueryVariables })
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation()
  const [, vote] = useVoteMutation()

  const onLoadMoreClick = useCallback(() => {
    let cursor = ''
    let excludeIdsArg: number[] | null = null
    const lastPost = posts[sort][posts[sort].length - 1]

    switch (sort) {
      case 'new':
        cursor = lastPost.createdAt
        break
      case 'popular': {
        const createdAt = lastPost.createdAt
        cursor = `createdAt=${createdAt},points=${pristine.popular.lastPostPoints}`

        excludeIdsArg =
          excludeIds.current.popular.length === 0
            ? null
            : excludeIds.current.popular
        break
      }
      case 'trending': {
        const createdAt = lastPost.createdAt
        const trendingScore = lastPost.trendingScore
        cursor = `createdAt=${createdAt},points=${pristine.trending.lastPostPoints},trendingScore=${trendingScore}`

        excludeIdsArg =
          excludeIds.current.trending.length === 0
            ? null
            : excludeIds.current.trending
        break
      }
    }

    onSetCursor(cursor)

    setPostsQueryVariables((prevPostsQueryInput) => ({
      ...prevPostsQueryInput,
      postsData: {
        ...prevPostsQueryInput.postsData,
        cursor,
        excludeIds: excludeIdsArg
      }
    }))
  }, [
    excludeIds,
    onSetCursor,
    posts,
    pristine.popular.lastPostPoints,
    pristine.trending.lastPostPoints,
    sort
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
          sort === 'popular' ||
          sort === 'trending'
        ) {
          onUpdateExcludedPostsFromUpdatedPost({
            id: postId,
            points: data.postPoints,
            createdAt: postCreatedAt
          })
        }
        return
      }

      cb(new Error(message))
      return
    }

    cb(new Error('The server is not responding.'))
  }, [
    onUpdateExcludedPostsFromUpdatedPost,
    sort,
    vote
  ])

  const onRadioGroupChange = useCallback((sort: string) => {
    const castedSort = sort as StoreSharedTypes.Sort
    onSetSort(castedSort)

    setPostsQueryVariables((prevPostsQueryVariables) => ({
      ...prevPostsQueryVariables,
      postsData: {
        ...prevPostsQueryVariables.postsData,
        sort: castedSort,
        cursor: cursors[castedSort] || null,
        excludeIds: castedSort === 'new'
          ? null
          : excludeIds.previous[castedSort].length === 0
            ? null
            : excludeIds.previous[castedSort]
      }
    }))
  }, [
    onSetSort,
    cursors,
    excludeIds.previous
  ])

  useEffect(() => {
    if (!fetching && data && data.posts.data) onSetPosts(data.posts.data.posts)
  }, [
    data,
    fetching,
    onSetPosts
  ])

  useEffect(() => {
    if (
      (sort === 'popular' || sort === 'trending') &&
      data &&
      data.posts.data &&
      data.posts.data.posts.length !== posts[sort].length
    ) {
      onSetCurrentExcludedIds()

      const newPostsCount = data.posts.data.posts.length - posts[sort].length
      const newPristinePosts = data.posts.data.posts.slice(-newPostsCount)

      onAddPristinePosts(newPristinePosts)

      const lastPost = data.posts.data.posts[data.posts.data.posts.length - 1]
      onUpdateExcludedPostsFromLastFetchedPost(lastPost)
    }
  }, [
    data,
    onAddPristinePosts,
    onSetCurrentExcludedIds,
    onUpdateExcludedPostsFromLastFetchedPost,
    posts,
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
