import * as SharedSymbols from '../symbols/shared'

const sharedPayloads = {
  error: {
    [SharedSymbols.USER_NOT_FOUND]: {
      httpCode: 404,
      code: 'USER_NOT_FOUND',
      message: 'The specific user has not been found.'
    }
  }
}

export default sharedPayloads
