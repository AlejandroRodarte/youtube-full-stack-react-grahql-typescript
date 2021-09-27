import React from 'react'

import * as pagesHomeModuleStoreTypes from '../context/store/modules/pages/home/types'
import { PostsQuery } from '../generated/graphql'

export namespace StoreSharedTypes {
  export type Sort = 'new' | 'popular' | 'trending'
  export type Posts = PostsQuery['posts']['data']['posts']

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

  interface SetSortPayload {
    sort: StoreSharedTypes.Sort
  }

  interface SetPostsPayload {
    posts: StoreSharedTypes.Posts
  }

  interface SetTimestampPayload {
    timestamp: string
  }

  interface AddPristinePostsPayload {
    posts: StoreSharedTypes.Posts
  }

  interface AddIdsPayload {
    ids: number[]
  }

  interface RegisterNewPostPayload {
    id: number
  }

  interface Reset {
    type: typeof pagesHomeModuleStoreTypes.RESET
  }

  interface SetCursor extends StoreSharedTypes.HasPayload<SetCursorPayload> {
    type: typeof pagesHomeModuleStoreTypes.SET_CURSOR
  }

  interface SetSort extends StoreSharedTypes.HasPayload<SetSortPayload> {
    type: typeof pagesHomeModuleStoreTypes.SET_SORT
  }

  interface SetPosts extends StoreSharedTypes.HasPayload<SetPostsPayload> {
    type: typeof pagesHomeModuleStoreTypes.SET_POSTS
  }

  interface SetTimestamp extends StoreSharedTypes.HasPayload<SetTimestampPayload> {
    type: typeof pagesHomeModuleStoreTypes.SET_TIMESTAMP
  }

  interface AddPristinePosts extends StoreSharedTypes.HasPayload<AddPristinePostsPayload> {
    type: typeof pagesHomeModuleStoreTypes.ADD_PRISTINE_POSTS
  }

  interface AddIds extends StoreSharedTypes.HasPayload<AddIdsPayload> {
    type: typeof pagesHomeModuleStoreTypes.ADD_IDS
  }

  interface SetPreviousArgs {
    type: typeof pagesHomeModuleStoreTypes.SET_PREVIOUS_ARGS
  }

  interface RegisterNewPost extends StoreSharedTypes.HasPayload<RegisterNewPostPayload> {
    type: typeof pagesHomeModuleStoreTypes.REGISTER_NEW_POST
  }

  export interface State {
    sort: StoreSharedTypes.Sort
    posts: StoreSharedTypes.SortConfig<StoreSharedTypes.Posts>
    cursors: StoreSharedTypes.SortConfig<string>
    timestamps: {
      current: StoreSharedTypes.SortConfig<string>,
      previous: StoreSharedTypes.SortConfig<string>
    }
    pristine: StoreSharedTypes.OptionalSortConfig<StoreSharedTypes.PristinePost[]>
    ids: {
      current: StoreSharedTypes.SortConfig<number[]>,
      previous: StoreSharedTypes.SortConfig<number[]>
    }
  }

  export type Actions =
    Reset |
    SetCursor |
    AddIds |
    SetSort |
    SetPosts |
    AddPristinePosts |
    SetPreviousArgs |
    SetTimestamp |
    RegisterNewPost
}

export namespace PagesModuleStore {
  export interface State {
    home: PagesModuleHomeStore.State
  }

  export type Actions = PagesModuleHomeStore.Actions
}

export namespace Store {
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
