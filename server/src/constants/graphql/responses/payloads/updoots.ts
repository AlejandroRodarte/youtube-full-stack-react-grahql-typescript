import * as UpdootsSymbols from '../symbols/updoots'

const updootsPayloads = {
  success: {
    [UpdootsSymbols.POST_VOTED]: {
      httpCode: 201,
      code: 'POST_VOTED',
      message: 'The posts has been voted.'
    },
    [UpdootsSymbols.VOTE_DELETED]: {
      httpCode: 204,
      code: 'VOTE_DELETED',
      message: 'The vote for this post has been deleted.'
    }
  },
  error: {
    [UpdootsSymbols.SAME_VOTE_VALUE]: {
      httpCode: 400,
      code: 'SAME_VOTE_VALUE',
      message: 'You can not set the same vote value as the one you had before.'
    },
    [UpdootsSymbols.VOTE_CANT_BE_ZERO]: {
      httpCode: 400,
      code: 'VOTE_CANT_BE_ZERO',
      message: 'The vote can not have a value of zero.'
    },
    [UpdootsSymbols.VOTE_ERROR]: {
      httpCode: 400,
      code: 'VOTE_ERROR',
      message: 'An error has occured while voting the post.'
    }
  }
}

export default updootsPayloads
