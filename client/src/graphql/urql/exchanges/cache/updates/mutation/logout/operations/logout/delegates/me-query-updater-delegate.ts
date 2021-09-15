import { MeQuery } from '../../../../../../../../../../generated/graphql'
import constants from '../../../../../../../../../constants/index'

const meQueryUpdaterDelegate: (query: MeQuery) => MeQuery = (query) => {
  return {
    ...query,
    __typename: 'Query',
    me: {
      ...query.me,
      __typename: 'MeResponse',
      status: constants.queries.users.error.me.httpCode,
      message: constants.queries.users.error.me.message,
      code: constants.queries.users.error.me.code,
      namespace: 'Me',
      data: null,
      errors: null
    }
  }
}

export default meQueryUpdaterDelegate
