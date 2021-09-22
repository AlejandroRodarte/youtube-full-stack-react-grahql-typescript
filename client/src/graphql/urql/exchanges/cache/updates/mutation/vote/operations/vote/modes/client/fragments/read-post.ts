import gql from 'graphql-tag'

const ReadPostFragment = gql`
  fragment VoteResolverVoteOperationClientModeReadPostFragment on Post {
    id
    points
    userVoteStatus
  }
`

export namespace ReadPost {
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

export default ReadPostFragment
