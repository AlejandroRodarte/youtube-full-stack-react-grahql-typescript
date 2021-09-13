import { Resolver } from '@urql/exchange-graphcache'
import { GraphQLPostsOperations } from '../../../../../../../types/graphql/operations/posts'

import { QueryPostsArgs, PostsQuery } from '../../../../../../../generated/graphql'

import isResponseOfNamespace from '../../../../../../../util/graphql/operations/functions/is-response-of-namespace'
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

    // get operation name from args.namespace
    const namespace = args.namespace

    // create mock parent response that includes the operation name
    const result: GraphQLPostsOperations.PostsOperationResponse = { ...parent, posts: { ...parent.posts, namespace } }

    // if we called query Posts($postsData: PostsInput!)...
    if (isResponseOfNamespace<PostsQuery, GraphQLPostsOperations.PostsOperationResponse>(result, 'posts', 'Posts')) {
      // ...paginate!
      return operations.posts.postsPaginatorDelegate(result, args, cache, info)
    }
  }

export default posts
