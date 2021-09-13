import { UpdateResolver } from '@urql/exchange-graphcache'

import { MeQuery, MeDocument, LogoutMutation } from '../../../../../../../generated/graphql'

import operations from './operations'
import isResponseOfNamespace from '../../../../../../../util/graphql/operations/functions/is-response-of-namespace'

import { GraphQLUsersOperations } from '../../../../../../../types/graphql/operations/users'

const logout: UpdateResolver<GraphQLUsersOperations.LogoutOperationResponse> = (
  result,
  args,
  cache,
  info
) => {
  if (isResponseOfNamespace<LogoutMutation, GraphQLUsersOperations.LogoutOperationResponse>(result, 'logout', 'Logout')) {
    return cache
      .updateQuery<MeQuery>(
        { query: MeDocument },
        (data) => operations.logout.meQueryUpdaterDelegate(data)
      )
  }
}

export default logout
