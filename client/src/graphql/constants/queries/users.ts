const users = {
  success: {
    me: {
      httpCode: 200,
      code: 'USER_LOGGED_IN',
      message: 'The user has logged in successfully.'
    }
  },
  error: {
    me: {
      httpCode: 401,
      code: 'UNAUTHORIZED',
      message: 'You are unauthorized to perform this action.'
    }
  }
}

export default users
