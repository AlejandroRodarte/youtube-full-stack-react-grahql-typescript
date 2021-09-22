import gql from 'graphql-tag'

const ReadPostDtoFragment = gql`
  fragment VoteResolverVoteOperationServerModeReadPostFragment on PostDto {
    id
  }
`

export namespace ReadPostDto {
  export type Query = {
    __typename: 'PostDto'
    id: number
  }

  export interface Variables {
    id: number
  }
}

export default ReadPostDtoFragment
