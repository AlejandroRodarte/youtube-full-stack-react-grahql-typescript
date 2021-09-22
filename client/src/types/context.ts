import React from 'react'

import * as pagesHomeModuleStoreTypes from '../context/store/modules/pages/home/types'
import { PostsQuery } from '../generated/graphql'

export namespace StoreSharedTypes {
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

export namespace PagesModuleHomeStore {
  interface SetCursorPayload {
    cursor: string
  }
  interface UpdateExcludedPostsFromUpdatedPostPayload {
    post: StoreSharedTypes.ExcludedPost
  }

  interface SetSortPayload {
    sort: StoreSharedTypes.Sort
  }

  interface SetPostsPayload {
    posts: StoreSharedTypes.Posts
  }

  interface AddPristinePostsPayload {
    posts: StoreSharedTypes.Posts
  }

  interface UpdateExcludedPostsFromLastFetchedPostPayload {
    post: StoreSharedTypes.Posts[number]
  }

  interface Reset {
    type: typeof pagesHomeModuleStoreTypes.RESET
  }

  interface SetCursor extends StoreSharedTypes.HasPayload<SetCursorPayload> {
    type: typeof pagesHomeModuleStoreTypes.SET_CURSOR
  }

  interface UpdateExcludedPostsFromUpdatedPost extends StoreSharedTypes.HasPayload<UpdateExcludedPostsFromUpdatedPostPayload> {
    type: typeof pagesHomeModuleStoreTypes.UPDATE_EXCLUDED_POSTS_FROM_UPDATED_POST
  }

  interface UpdateExcludedPostsFromLastFetchedPost extends StoreSharedTypes.HasPayload<UpdateExcludedPostsFromLastFetchedPostPayload> {
    type: typeof pagesHomeModuleStoreTypes.UPDATE_EXCLUDED_POSTS_FROM_LAST_FETCHED_POST
  }

  interface SetSort extends StoreSharedTypes.HasPayload<SetSortPayload> {
    type: typeof pagesHomeModuleStoreTypes.SET_SORT
  }

  interface SetPosts extends StoreSharedTypes.HasPayload<SetPostsPayload> {
    type: typeof pagesHomeModuleStoreTypes.SET_POSTS
  }

  interface AddPristinePosts extends StoreSharedTypes.HasPayload<AddPristinePostsPayload> {
    type: typeof pagesHomeModuleStoreTypes.ADD_PRISTINE_POSTS
  }

  export interface State {
    sort: StoreSharedTypes.Sort
    posts: StoreSharedTypes.SortConfig<StoreSharedTypes.Posts>
    cursors: StoreSharedTypes.SortConfig<string>
    exclude: StoreSharedTypes.OptionalSortConfig<StoreSharedTypes.ExcludedPost[]>
    pristine: StoreSharedTypes.OptionalSortConfig<StoreSharedTypes.PristinePost[]>
  }

  export type Actions =
    Reset |
    SetCursor |
    UpdateExcludedPostsFromUpdatedPost |
    SetSort |
    SetPosts |
    AddPristinePosts |
    UpdateExcludedPostsFromLastFetchedPost
}

export namespace PagesModuleStore {
  export interface State {
    home: PagesModuleHomeStore.State
  }

  export type Actions = PagesModuleHomeStore.Actions
}

export namespace Store {
  export interface PagesHomeState {
    sort: StoreSharedTypes.Sort
    posts: StoreSharedTypes.SortConfig<StoreSharedTypes.Posts>
    cursors: StoreSharedTypes.SortConfig<string>
    exclude: StoreSharedTypes.OptionalSortConfig<StoreSharedTypes.ExcludedPost[]>
    pristine: StoreSharedTypes.OptionalSortConfig<StoreSharedTypes.PristinePost[]>
  }
  export interface PagesState {
    home: PagesHomeState
  }

  export interface State {
    pages: PagesModuleStore.State
  }

  export type Actions = PagesModuleStore.Actions
}

export namespace Contexts {
  export interface AppContext {
    store: {
      state: Store.State
      dispatch: React.Dispatch<Store.Actions>
    }
  }
}
