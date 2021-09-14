import gql from 'graphql-tag'

const WritePostFragment = gql`
  fragment WritePostFragment on Post {
    id
    points
  }
`

export namespace WritePost {
  export type Query = {
    __typename: 'Post',
    id: number,
    points: number
  }

  export interface Variables {
    id: number
  }
}

export default WritePostFragment
