import { UpdaterDelegateFunction } from '../../../../../../../../../types/graphql/urql/cache/updates'
import { MeQuery, ChangePasswordMutation } from '../../../../../../../../../generated/graphql'
import constants from '../../../../../../../../constants'

const meQueryUpdaterDelegate: UpdaterDelegateFunction<ChangePasswordMutation, MeQuery> = (
  result,
  query
) => {
  if (result.changePassword.errors) return query

  if (!query || !query.me || !query.me.data) {
    return {
      __typename: 'Query',
      me: {
        __typename: 'MeUserResponse',
        status: constants.queries.users.success.me.httpCode,
        message: constants.queries.users.success.me.message,
        code: constants.queries.users.success.me.code,
        _kind: 'Me',
        data: {
          __typename: 'MeUserData',
          user: {
            __typename: 'User',
            ...result.changePassword.data.updatedUser
          }
        },
        errors: null
      }
    }
  }

  return {
    ...query,
    __typename: 'Query',
    me: {
      ...query.me,
      __typename: 'MeUserResponse',
      status: constants.queries.users.success.me.httpCode,
      message: constants.queries.users.success.me.message,
      code: constants.queries.users.success.me.code,
      data: {
        ...query.me.data,
        __typename: 'MeUserData',
        user: {
          __typename: 'User',
          ...result.changePassword.data.updatedUser
        }
      },
      errors: null
    }
  }
}

export default meQueryUpdaterDelegate
