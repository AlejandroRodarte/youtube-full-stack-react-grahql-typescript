import gql from 'graphql-tag'

const ReadPostFragment = gql`
  fragment ReadPostFragment on Post {
    id
  }
`

export namespace ReadPost {
  export type Query = {
    __typename: 'Post',
    id: number
  }

  export interface Variables {
    id: number
  }
}

export default ReadPostFragment
