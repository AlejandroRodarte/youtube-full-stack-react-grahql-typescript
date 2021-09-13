import { MeQuery, ChangePasswordMutation } from '../../../../../../../../../generated/graphql'
import constants from '../../../../../../../../constants'

import { GraphQLUrqlCache } from '../../../../../../../../../types/graphql/urql/cache'

const meQueryUpdaterDelegate: GraphQLUrqlCache.UpdaterDelegateFunction<ChangePasswordMutation, MeQuery> = (
  result,
  query
) => {
  if (result.changePassword.errors) return query

  if (!query || !query.me || !query.me.data) {
    return {
      __typename: 'Query',
      me: {
        __typename: 'MeResponse',
        status: constants.queries.users.success.me.httpCode,
        message: constants.queries.users.success.me.message,
        code: constants.queries.users.success.me.code,
        namespace: 'Me',
        data: {
          __typename: 'MeData',
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
      __typename: 'MeResponse',
      status: constants.queries.users.success.me.httpCode,
      message: constants.queries.users.success.me.message,
      code: constants.queries.users.success.me.code,
      data: {
        ...query.me.data,
        __typename: 'MeData',
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
