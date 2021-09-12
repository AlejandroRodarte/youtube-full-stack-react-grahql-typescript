import { UpdateResolver } from '@urql/exchange-graphcache'

import { MutationAddPostArgs, AddPostMutation, PostsQuery, PostsDocument, PostsQueryVariables, QueryPostsArgs } from '../../../../../../../generated/graphql'

import operations from './operations'
import isResponseOfKind from '../../../../../../../util/graphql/operations/functions/is-response-of-kind'

import { GraphQLPostsOperations } from '../../../../../../../types/graphql/operations/posts'

const addPost: UpdateResolver<GraphQLPostsOperations.AddPostOperationResponse, MutationAddPostArgs> = (
  result,
  args,
  cache,
  info
) => {
  // if this resolver got called from mutation AddPost($addPostData: AddPostInput!)...
  if (isResponseOfKind<AddPostMutation, GraphQLPostsOperations.AddPostOperationResponse>(result, 'addPost', 'AddPost')) {
    // get all query records
    const queriesInfo = cache.inspectFields('Query')

    // try to find query cached response from fetching the newest posts (no cursor on argument)
    const newestPostsInfo = queriesInfo.find(
      (info) => info.fieldName === 'posts' &&
      (info.arguments as QueryPostsArgs).data.sort === 'new' &&
      !(info.arguments as QueryPostsArgs).data.cursor
    )

    // if no record of querying the newest posts is present, do nothing
    if (!newestPostsInfo) return

    // try to resolve cache for Query.posts(<args>).data of the query that tried to fetch the newest posts
    const newestPosts = cache.resolve('Query', 'posts', newestPostsInfo.arguments)
    const data = cache.resolve(newestPosts as string, 'data')

    // if there is a failed attempt of fetching the newest posts, do nothing
    if (!data) return

    // update cache from the newest posts query
    return cache
      .updateQuery<PostsQuery, PostsQueryVariables>(
        { query: PostsDocument, variables: { postsData: (newestPostsInfo.arguments as QueryPostsArgs).data } },
        (data) => operations.addPost.postsQueryUpdaterDelegate(result, data)
      )
  }
}

export default addPost
