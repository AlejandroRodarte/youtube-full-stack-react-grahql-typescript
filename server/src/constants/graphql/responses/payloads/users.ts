import * as UsersSymbols from '../symbols/users'

const userPayloads = {
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
    },
    [UsersSymbols.RESET_PASSWORD_EMAIL_SENT]: {
      httpCode: 200,
      code: 'RESET_PASSWORD_EMAIL_SENT',
      message: 'The reset password email has been sent.'
    },
    [UsersSymbols.USER_PASSWORD_UPDATED]: {
      httpCode: 201,
      code: 'USER_PASSWORD_UPDATED',
      message: 'The user\'s password has been updated.'
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
    [UsersSymbols.MUTATION_LOGOUT_ERROR]: {
      httpCode: 400,
      code: 'MUTATION_LOGOUT_ERROR',
      message: 'An error has occured while logging out the user.'
    },
    [UsersSymbols.MUTATION_FORGOT_PASSWORD_ERROR]: {
      httpCode: 400,
      code: 'MUTATION_FORGOT_PASSWORD_ERROR',
      message: 'An error has occured while sending the recovery password email.'
    },
    [UsersSymbols.MUTATION_CHANGE_PASSWORD_ERROR]: {
      httpCode: 400,
      code: 'MUTATION_CHANGE_PASSWORD_ERROR',
      message: 'An error has occured while changing the user password.'
    },
    [UsersSymbols.USERNAME_ALREADY_EXISTS]: {
      httpCode: 400,
      code: 'USERNAME_ALREADY_EXISTS',
      message: 'A user with that username already exists in the database.'
    },
    [UsersSymbols.INCORRECT_PASSWORD]: {
      httpCode: 400,
      code: 'INCORRECT_PASSWORD',
      message: 'The password for that account is incorrect.'
    },
    [UsersSymbols.FORGOT_PASSWORD_TOKEN_NOT_FOUND]: {
      httpCode: 404,
      code: 'FORGOT_PASSWORD_TOKEN_NOT_FOUND',
      message: 'The recovery password token was not found in the redis database.'
    }
  }
}

export default userPayloads
