import gql from 'graphql-tag'

const WritePostFragment = gql`
  fragment VoteResolverVoteOperationClientModeWritePostFragment on Post {
    id
    points
    userVoteStatus
  }
`

export namespace WritePost {
  export type Query = {
    __typename: 'Post'
    id: number
    points: number
    userVoteStatus: number
  }

  export interface Variables {
    id: number
  }
}

export default WritePostFragment
