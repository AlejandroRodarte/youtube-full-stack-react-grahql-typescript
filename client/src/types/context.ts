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

  interface HomePageContext {
    sort: UseStateValues<Sort>
    posts: SortConfig<Posts>
    cursors: SortConfig<string | null>
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
