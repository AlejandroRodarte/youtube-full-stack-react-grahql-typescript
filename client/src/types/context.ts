import React from 'react'

import { PostsQuery } from '../generated/graphql'

export namespace StateCommonTypes {
  export type Sort = 'new' | 'popular'
  export type Posts = PostsQuery['posts']['data']['posts']

  export interface ExcludedPost {
    id: number
    points: number
    createdAt: string
  }

  export interface PristinePost {
    id: number
    points: number
  }

  export type SortConfig<T> = {
    // eslint-disable-next-line no-unused-vars
    [key in Sort]: T
  }

  export type OptionalSortConfig<T> = {
    // eslint-disable-next-line no-unused-vars
    [key in Sort]?: T
  }

  export interface HasPayload<T> {
    payload: T
  }
}

export namespace HomeModule {
  interface Reset {
    type: 'home/reset'
  }

  interface SetCursorPayload {
    cursor: string
  }
  interface UpdateExcludedPopularPostsFromUpdatedPostPayload {
    post: StateCommonTypes.ExcludedPost
  }

  interface SetSortPayload {
    sort: StateCommonTypes.Sort
  }

  interface SetPostsPayload {
    posts: StateCommonTypes.Posts
  }

  interface AddPristinePopularPostsPayload {
    posts: StateCommonTypes.Posts
  }

  interface UpdateExcludedPopularPostsFromLastFetchedPostPayload {
    post: StateCommonTypes.Posts[number]
  }

  interface SetCursor extends StateCommonTypes.HasPayload<SetCursorPayload> {
    type: 'home/setCursor'
  }

  interface UpdateExcludedPopularPostsFromUpdatedPost extends StateCommonTypes.HasPayload<UpdateExcludedPopularPostsFromUpdatedPostPayload> {
    type: 'home/updateExcludedPopularPostsFromUpdatedPost'
  }

  interface UpdateExcludedPopularPostsFromLastFetchedPost extends StateCommonTypes.HasPayload<UpdateExcludedPopularPostsFromLastFetchedPostPayload> {
    type: 'home/updateExcludedPopularPostsFromLastFetchedPost'
  }

  interface SetSort extends StateCommonTypes.HasPayload<SetSortPayload> {
    type: 'home/setSort'
  }

  interface SetPosts extends StateCommonTypes.HasPayload<SetPostsPayload> {
    type: 'home/setPosts'
  }

  interface AddPristinePopularPosts extends StateCommonTypes.HasPayload<AddPristinePopularPostsPayload> {
    type: 'home/addPristinePopularPosts'
  }

  export type HomeModuleActions =
    Reset |
    SetCursor |
    UpdateExcludedPopularPostsFromUpdatedPost |
    SetSort |
    SetPosts |
    AddPristinePopularPosts |
    UpdateExcludedPopularPostsFromLastFetchedPost
}

export namespace State {
  export interface AppState {
    pages: {
      home: {
        sort: StateCommonTypes.Sort
        posts: StateCommonTypes.SortConfig<StateCommonTypes.Posts>
        cursors: StateCommonTypes.SortConfig<string>
        exclude: StateCommonTypes.OptionalSortConfig<StateCommonTypes.ExcludedPost[]>
        pristine: StateCommonTypes.OptionalSortConfig<StateCommonTypes.PristinePost[]>
      }
    }
  }

  export type AppActions = HomeModule.HomeModuleActions
}

export namespace Contexts {
  export interface AppContext {
    store: {
      state: State.AppState
      dispatch: React.Dispatch<State.AppActions>
    }
  }
}
