import { GraphQLConstants } from '../../../../types/graphql'

const constraintPayloads: GraphQLConstants.Constraints = {
  user_email_unique: {
    httpCode: 400,
    code: 'USER_EMAIL_UNIQUE',
    message: 'That email is already taken.',
    fieldError: {
      path: 'data.email',
      message: 'That email is already taken.',
      type: 'db.constraints.user_email_unique',
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
      type: 'db.constraints.user_username_unique',
      label: 'Username'
    }
  },
  updoot_post_postId_id: {
    httpCode: 400,
    code: 'UPDOOT_POST_POSTID_ID',
    message: 'There is no post with that given postId.',
    fieldError: {
      path: 'data.postId',
      message: 'That post does not exist.',
      type: 'db.constraints.updoot_post_postId_id',
      label: 'Post ID'
    }
  }
}

export default constraintPayloads
