import { UpdaterDelegateFunction } from '../../../../../../../../../types/graphql/urql/cache/updates'
import { LoginMutation, MeQuery } from '../../../../../../../../../generated/graphql'
import constants from '../../../../../../../../constants'

const meQueryUpdaterDelegate: UpdaterDelegateFunction<LoginMutation, MeQuery> = (
  result,
  query
) => {
  if (result.login.errors) return query
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
          ...result.login.data.user
        }
      },
      errors: null
    }
  }
}

export default meQueryUpdaterDelegate
