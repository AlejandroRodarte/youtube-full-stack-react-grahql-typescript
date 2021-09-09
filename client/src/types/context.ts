import React from 'react'

import { PostsQuery } from '../generated/graphql'

export namespace Contexts {
  export type Posts = PostsQuery['posts']['data']['posts']

  export interface AppContext {
    posts: Posts
    setPosts: React.Dispatch<React.SetStateAction<Posts>>
  }
}
