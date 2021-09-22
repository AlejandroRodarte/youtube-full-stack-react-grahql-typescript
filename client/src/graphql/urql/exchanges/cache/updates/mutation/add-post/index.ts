import { UpdateResolver } from '@urql/exchange-graphcache'

import { MutationAddPostArgs, AddPostMutation } from '../../../../../../../generated/graphql'

import operations from './operations'
import isResponseOfNamespace from '../../../../../../../util/graphql/operations/functions/is-response-of-namespace'

import { GraphQLPostsOperations } from '../../../../../../../types/graphql/operations/posts'

const addPost: UpdateResolver<GraphQLPostsOperations.AddPostOperationResponse, MutationAddPostArgs> = (
  result,
  args,
  cache,
  info
) => {
  // if this resolver got called from mutation AddPost($addPostData: AddPostInput!), call the appropiate handler
  if (isResponseOfNamespace<AddPostMutation, GraphQLPostsOperations.AddPostOperationResponse>(result, 'addPost', 'AddPost')) {
    if (
      result.addPost.status === 400 ||
      result.addPost.status === 401 ||
      result.addPost.errors
    ) return
    return operations.handleAddPostOperation('push', result, cache)
  }
}

export default addPost
