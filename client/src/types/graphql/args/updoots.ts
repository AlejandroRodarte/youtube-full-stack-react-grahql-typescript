export namespace GraphQLVoteArgs {
  interface VoteDataErrors {
    postId?: string
    value?: string
  }

  export interface VoteArgsErrors {
    data?: VoteDataErrors
  }
}
