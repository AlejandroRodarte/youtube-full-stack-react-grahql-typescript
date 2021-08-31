import { GraphQLConstants } from '../../../../types/graphql'

const constraintPayloads: GraphQLConstants.Constraints = {
  user_email_unique: {
    httpCode: 400,
    code: 'USER_EMAIL_UNIQUE',
    message: 'That email is already taken.',
    fieldError: {
      path: 'data.email',
      message: 'That email is already taken.',
      type: 'db.user_email_unique',
      label: 'Email'
    }
  },
  user_username_unique: {
    httpCode: 400,
    code: 'USER_USERNAME_UNIQUE',
    message: 'That username is already taken.',
    fieldError: {
      path: 'data.username',
      message: 'That username is already taken.',
      type: 'db.user_username_unique',
      label: 'Username'
    }
  }
}

export default constraintPayloads