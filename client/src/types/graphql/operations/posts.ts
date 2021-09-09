import { PostsQuery, AddPostMutation } from '../../../generated/graphql'

export namespace GraphQLPostsOperations {
  export type PostsOperationResponse = PostsQuery
  export type AddPostOperationResponse = AddPostMutation
}
