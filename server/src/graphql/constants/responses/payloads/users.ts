import * as UsersSymbols from '../symbols/users'

const codesAndMessages = {
  success: {
    [UsersSymbols.USER_REGISTERED]: {
      httpCode: 201,
      code: 'USER_REGISTERED',
      message: 'The user has been registered.'
    },
    [UsersSymbols.USER_LOGGED_IN]: {
      httpCode: 200,
      code: 'USER_LOGGED_IN',
      message: 'The user has logged in successfully.'
    },
    [UsersSymbols.OWN_USER_FETCHED]: {
      httpCode: 200,
      code: 'OWN_USER_FETCHED',
      message: 'Your user information has been fetched.'
    },
    [UsersSymbols.USER_LOGGED_OUT]: {
      httpCode: 200,
      code: 'USER_LOGGED_OUT',
      message: 'The user has logged out successfully.'
    }
  },
  error: {
    [UsersSymbols.MUTATION_REGISTER_ERROR]: {
      httpCode: 400,
      code: 'MUTATION_REGISTER_ERROR',
      message: 'An error has occured while registering the user.'
    },
    [UsersSymbols.MUTATION_LOGIN_ERROR]: {
      httpCode: 400,
      code: 'MUTATION_LOGIN_ERROR',
      message: 'An error has occured while logging in the user.'
    },
    [UsersSymbols.MUTATION_ME_ERROR]: {
      httpCode: 400,
      code: 'MUTATION_ME_ERROR',
      message: 'An error has occured while fetching your user information.'
    },
    [UsersSymbols.MUTATION_LOGOUT_ERROR]: {
      httpCode: 400,
      code: 'MUTATION_LOGOUT_ERROR',
      message: 'An error has occured while logging out the user.'
    },
    [UsersSymbols.USERNAME_ALREADY_EXISTS]: {
      httpCode: 400,
      code: 'USERNAME_ALREADY_EXISTS',
      message: 'A user with that username already exists in the database.'
    },
    [UsersSymbols.USER_NOT_FOUND]: {
      httpCode: 404,
      code: 'USER_NOT_FOUND',
      message: 'The specific user has not been found.'
    },
    [UsersSymbols.INCORRECT_PASSWORD]: {
      httpCode: 400,
      code: 'INCORRECT_PASSWORD',
      message: 'The password for that account is incorrect.'
    }
  }
}

export default codesAndMessages
