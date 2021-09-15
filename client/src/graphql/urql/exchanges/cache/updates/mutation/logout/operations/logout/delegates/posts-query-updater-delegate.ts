import { PostsQuery } from '../../../../../../../../../../generated/graphql'

const postsQueryUpdaterDelegate: (query: PostsQuery) => PostsQuery = (query) => ({
  __typename: 'Query',
  ...query,
  posts: {
    __typename: 'PostsResponse',
    ...query.posts,
    data: {
      __typename: 'PostsData',
      ...query.posts.data,
      posts: query.posts.data.posts.map((post) => ({
        ...post,
        userVoteStatus: null
      }))
    }
  }
})

export default postsQueryUpdaterDelegate
