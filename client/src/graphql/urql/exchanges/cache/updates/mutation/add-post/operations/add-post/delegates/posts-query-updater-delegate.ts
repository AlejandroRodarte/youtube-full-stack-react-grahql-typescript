import { AddPostMutation, PostsQuery } from '../../../../../../../../../../generated/graphql'

import { GraphQLUrqlCache } from '../../../../../../../../../../types/graphql/urql/cache'

const postsQueryUpdaterDelegate: GraphQLUrqlCache.UpdaterDelegateFunction<AddPostMutation, PostsQuery> = (
  result,
  query
) => {
  if (!query) return query

  // if post was added in database, use response to put it at the front of the cached response
  return {
    ...query,
    posts: {
      ...query.posts,
      data: {
        ...query.posts.data,
        posts: [result.addPost.data.newPost, ...query.posts.data.posts]
      }
    }
  }
}

export default postsQueryUpdaterDelegate
