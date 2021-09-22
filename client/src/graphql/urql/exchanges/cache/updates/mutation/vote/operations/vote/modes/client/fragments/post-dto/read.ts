import gql from 'graphql-tag'

const ReadPostDtoFragment = gql`
  fragment VoteResolverVoteOperationClientModeReadPostFragment on PostDto {
    id
    points
    userVoteStatus
  }
`

export namespace ReadPostDto {
  export type Query = {
    __typename: 'PostDto'
    id: number
    points: number
    userVoteStatus: number
  }

  export interface Variables {
    id: number
  }
}

export default ReadPostDtoFragment
