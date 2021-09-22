import gql from 'graphql-tag'

const WritePostDtoFragment = gql`
  fragment VoteResolverVoteOperationServerModeWritePostFragment on PostDto {
    id
    points
    userVoteStatus
  }
`

export namespace WritePostDto {
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

export default WritePostDtoFragment
