import React from 'react'

import { PostsQuery } from '../generated/graphql'

export namespace StateCommonTypes {
  export type Sort = 'new' | 'popular' | 'trending'
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

  interface SetCursorPayload {
    cursor: string
  }
  interface UpdateExcludedPostsFromUpdatedPostPayload {
    post: StateCommonTypes.ExcludedPost
  }

  interface SetSortPayload {
    sort: StateCommonTypes.Sort
  }

  interface SetPostsPayload {
    posts: StateCommonTypes.Posts
  }

  interface AddPristinePostsPayload {
    posts: StateCommonTypes.Posts
  }

  interface UpdateExcludedPostsFromLastFetchedPostPayload {
    post: StateCommonTypes.Posts[number]
  }

  interface Reset {
    type: 'home/reset'
  }

  interface SetCursor extends StateCommonTypes.HasPayload<SetCursorPayload> {
    type: 'home/setCursor'
  }

  interface UpdateExcludedPostsFromUpdatedPost extends StateCommonTypes.HasPayload<UpdateExcludedPostsFromUpdatedPostPayload> {
    type: 'home/updateExcludedPostsFromUpdatedPost'
  }

  interface UpdateExcludedPostsFromLastFetchedPost extends StateCommonTypes.HasPayload<UpdateExcludedPostsFromLastFetchedPostPayload> {
    type: 'home/updateExcludedPostsFromLastFetchedPost'
  }

  interface SetSort extends StateCommonTypes.HasPayload<SetSortPayload> {
    type: 'home/setSort'
  }

  interface SetPosts extends StateCommonTypes.HasPayload<SetPostsPayload> {
    type: 'home/setPosts'
  }

  interface AddPristinePosts extends StateCommonTypes.HasPayload<AddPristinePostsPayload> {
    type: 'home/addPristinePosts'
  }

  export type HomeModuleActions =
    Reset |
    SetCursor |
    UpdateExcludedPostsFromUpdatedPost |
    SetSort |
    SetPosts |
    AddPristinePosts |
    UpdateExcludedPostsFromLastFetchedPost
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
