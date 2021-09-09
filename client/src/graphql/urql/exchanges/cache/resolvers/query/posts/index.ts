import { Resolver } from '@urql/exchange-graphcache'
import { GraphQLPostsOperations } from '../../../../../../../types/graphql/operations/posts'

import { QueryPostsArgs, PostsQuery } from '../../../../../../../generated/graphql'

import isResponseOfKind from '../../../../../../../util/graphql/operations/functions/is-response-of-kind'
import operations from './operations'

const posts: Resolver<GraphQLPostsOperations.PostsOperationResponse, QueryPostsArgs> =
  (
    parent,
    args,
    cache,
    info
  ) => {
    // entityKey: 'Query', fieldName: 'posts'
    const { parentKey: entityKey, fieldName } = info

    // get cached response (200 or 400) from most recent query
    const posts = cache.resolve(entityKey, fieldName, args)

    // if most recent query has not been sent to the server, restart to make the request
    if (!posts) {
      info.partial = true
      return undefined
    }

    // get operation name from response
    const _kind = cache.resolve(posts as string, '_kind') as string

    // create mock parent response that includes the operation name
    const response = { ...parent, posts: { ...parent.posts, _kind } }

    // if we called query Posts($postsData: PostsInput!)...
    if (isResponseOfKind<PostsQuery, GraphQLPostsOperations.PostsOperationResponse>(response, 'posts', 'Posts')) {
      // ...paginate!
      return operations.posts.postsPaginatorDelegate(parent, args, cache, info)
    }
  }

export default posts
