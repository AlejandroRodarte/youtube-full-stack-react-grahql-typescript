import { UpdateResolver } from '@urql/exchange-graphcache'

import { MutationAddPostArgs, AddPostMutation } from '../../../../../../../generated/graphql'

import operations from './operations'
import isResponseOfKind from '../../../../../../../util/graphql/operations/functions/is-response-of-kind'

import { GraphQLPostsOperations } from '../../../../../../../types/graphql/operations/posts'

const addPost: UpdateResolver<GraphQLPostsOperations.AddPostOperationResponse, MutationAddPostArgs> = (
  result,
  args,
  cache,
  info
) => {
  // if this resolver got called from mutation AddPost($addPostData: AddPostInput!), call the appropiate handler
  if (isResponseOfKind<AddPostMutation, GraphQLPostsOperations.AddPostOperationResponse>(result, 'addPost', 'AddPost')) {
    return operations.handleAddPostOperation('push', result, cache)
  }
}

export default addPost
