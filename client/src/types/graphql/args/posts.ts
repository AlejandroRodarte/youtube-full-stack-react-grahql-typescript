export namespace GraphQLPostsArgs {
  interface AddPostDataErrors {
    title?: string
    text?: string
  }

  export interface AddPostArgsErrors {
    data: AddPostDataErrors
  }
}
