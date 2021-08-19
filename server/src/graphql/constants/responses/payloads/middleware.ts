import * as MiddlewareSymbols from '../symbols/middleware'

const codesAndMessages = {
  error: {
    [MiddlewareSymbols.ARGS_VALIDATION_ERROR]: {
      httpCode: 400,
      code: 'ARGS_VALIDATION_ERROR',
      message: 'There are validation errors in the input arguments provided.'
    },
    [MiddlewareSymbols.UNAUTHORIZED]: {
      httpCode: 401,
      code: 'UNAUTHORIZED',
      message: 'You are unauthorized to perform this action.'
    }
  }
}

export default codesAndMessages
