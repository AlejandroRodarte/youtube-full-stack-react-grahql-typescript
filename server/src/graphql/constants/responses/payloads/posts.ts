import * as PostsSymbols from '../symbols/posts'

const codesAndMessages = {
  success: {
    [PostsSymbols.POSTS_FETCHED]: {
      httpCode: 200,
      code: 'POSTS_FETCHED',
      message: 'The posts have been fetched.'
    },
    [PostsSymbols.POST_FETCHED]: {
      httpCode: 200,
      code: 'POST_FETCHED',
      message: 'The post has been fetched.'
    },
    [PostsSymbols.POST_CREATED]: {
      httpCode: 201,
      code: 'POST_CREATED',
      message: 'The post has been created.'
    },
    [PostsSymbols.POST_UPDATED]: {
      httpCode: 201,
      code: 'POST_UPDATED',
      message: 'The post has been updated.'
    },
    [PostsSymbols.POST_DELETED]: {
      httpCode: 200,
      code: 'POST_DELETED',
      message: 'The post has been deleted.'
    }
  },
  error: {
    [PostsSymbols.QUERY_POSTS_ERROR]: {
      httpCode: 400,
      code: 'QUERY_POSTS_ERROR',
      message: 'An error has occured while fetching the posts.'
    },
    [PostsSymbols.QUERY_POST_ERROR]: {
      httpCode: 400,
      code: 'QUERY_POST_ERROR',
      message: 'An error has occured while fetching the post.'
    },
    [PostsSymbols.MUTATION_ADD_POST_ERROR]: {
      httpCode: 400,
      code: 'MUTATION_ADD_POST_ERROR',
      message: 'An error has occured while adding the post.'
    },
    [PostsSymbols.MUTATION_EDIT_POST_ERROR]: {
      httpCode: 400,
      code: 'MUTATION_EDIT_POST_ERROR',
      message: 'An error has occured while editing the post.'
    },
    [PostsSymbols.MUTATION_DELETE_POST_ERROR]: {
      httpCode: 400,
      code: 'MUTATION_DELETE_POST_ERROR',
      message: 'An error has occured while deleting the post.'
    },
    [PostsSymbols.POST_NOT_FOUND]: {
      httpCode: 404,
      code: 'POST_NOT_FOUND',
      message: 'The specified post does not exist in the database.'
    }
  }
}

export default codesAndMessages
