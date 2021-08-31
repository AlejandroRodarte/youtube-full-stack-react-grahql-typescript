import * as MiddlewareSymbols from '../symbols/middleware'

const middlewarePayloads = {
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
    },
    [MiddlewareSymbols.MIDDLEWARE_AUTH_ERROR]: {
      httpCode: 400,
      code: 'MIDDLEWARE_AUTH_ERROR',
      message: 'There was an error running the authentication middleware.'
    },
    [MiddlewareSymbols.MUST_BE_ANONYMOUS]: {
      httpCode: 400,
      code: 'MUST_BE_ANONYMOUS',
      message: 'You need to be logged out (or be an anonymous user) to perform this action.'
    },
    [MiddlewareSymbols.NOT_POST_OWNER]: {
      httpCode: 401,
      code: 'NOT_POST_OWNER',
      message: 'You are not authorized to change this post as you are not the post owner.'
    },
    [MiddlewareSymbols.MIDDLEWARE_CAN_MUTATE_POST_ERROR]: {
      httpCode: 400,
      code: 'MIDDLEWARE_CAN_MUTATE_POST_ERROR',
      message: 'An error has occures while trying to dictate if the user can mutate this post.'
    }
  }
}

export default middlewarePayloads
