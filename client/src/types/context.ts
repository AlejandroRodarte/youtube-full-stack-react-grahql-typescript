import React from 'react'

import { PostsQuery } from '../generated/graphql'

export namespace Contexts {
  interface UseStateValues<T> {
    value: T
    set: React.Dispatch<React.SetStateAction<T>>
  }

  type SortConfig<T> = {
    // eslint-disable-next-line no-unused-vars
    [key in Sort]: UseStateValues<T>
  }

  type OptionalSortConfig<T> = {
    // eslint-disable-next-line no-unused-vars
    [key in Sort]?: UseStateValues<T>
  }

  export interface PostPointsCondensedObject {
    postId: number
    points: number
  }

  interface PristineConfig {
    popular: {
      points: UseStateValues<PostPointsCondensedObject[]>
    }
  }

  interface HomePageContext {
    sort: UseStateValues<Sort>
    posts: SortConfig<Posts>
    cursors: SortConfig<string | null>
    excludeIds: OptionalSortConfig<PostPointsCondensedObject[] | null>
    pristine: PristineConfig
  }

  interface PagesContext {
    home: HomePageContext
  }

  export type Sort = 'new' | 'popular'
  export type Posts = PostsQuery['posts']['data']['posts']

  export interface AppContext {
    pages: PagesContext
  }
}
