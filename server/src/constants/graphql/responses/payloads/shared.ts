import * as SharedSymbols from '../symbols/shared'

const sharedPayloads = {
  error: {
    [SharedSymbols.USER_NOT_FOUND]: {
      httpCode: 404,
      code: 'USER_NOT_FOUND',
      message: 'The specific user has not been found.'
    },
    [SharedSymbols.POST_NOT_FOUND]: {
      httpCode: 404,
      code: 'POST_NOT_FOUND',
      message: 'The specified post does not exist in the database.'
    }
  }
}

export default sharedPayloads
