import { UpdateResolver } from '@urql/exchange-graphcache'

import { LogoutMutation } from '../../../../../../../generated/graphql'

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
    if (
      result.logout.status === 401 ||
      result.logout.status === 400 ||
      result.logout.errors
    ) return
    return operations.handleLogoutOperation(cache)
  }
}

export default logout
