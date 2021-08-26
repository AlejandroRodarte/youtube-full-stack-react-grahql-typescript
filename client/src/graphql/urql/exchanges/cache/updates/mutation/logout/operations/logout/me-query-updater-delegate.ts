import { MeQuery } from '../../../../../../../../../generated/graphql'

const meQueryUpdaterDelegate: (query: MeQuery) => MeQuery = (query) => {
  return {
    ...query,
    __typename: 'Query',
    me: {
      ...query.me,
      status: null,
      message: null,
      code: null,
      _kind: null,
      data: null,
      errors: null
    }
  }
}

export default meQueryUpdaterDelegate
