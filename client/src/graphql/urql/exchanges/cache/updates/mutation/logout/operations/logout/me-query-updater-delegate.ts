import { MeQuery } from '../../../../../../../../../generated/graphql'
import constants from '../../../../../../../../constants/index'

const meQueryUpdaterDelegate: (query: MeQuery) => MeQuery = (query) => {
  return {
    ...query,
    __typename: 'Query',
    me: {
      ...query.me,
      status: constants.queries.users.error.me.httpCode,
      message: constants.queries.users.error.me.message,
      code: constants.queries.users.error.me.code,
      _kind: 'Me',
      data: null,
      errors: null
    }
  }
}

export default meQueryUpdaterDelegate
