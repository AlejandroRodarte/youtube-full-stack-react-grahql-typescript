import { UpdateResolver } from '@urql/exchange-graphcache'

import { MeQuery, MeDocument, MutationChangePasswordArgs, ChangePasswordMutation } from '../../../../../../../generated/graphql'

import operations from './operations'
import isResponseOfNamespace from '../../../../../../../util/graphql/operations/functions/is-response-of-namespace'

import { GraphQLUsersOperations } from '../../../../../../../types/graphql/operations/users'

const login: UpdateResolver<GraphQLUsersOperations.ChangePasswordOperationResponse, MutationChangePasswordArgs> = (
  result,
  args,
  cache,
  info
) => {
  if (isResponseOfNamespace<ChangePasswordMutation, GraphQLUsersOperations.ChangePasswordOperationResponse>(result, 'changePassword', 'ChangePassword')) {
    if (
      result.changePassword.status === 400 ||
      result.changePassword.status === 404 ||
      result.changePassword.errors
    ) return
    return cache
      .updateQuery<MeQuery>(
        { query: MeDocument },
        (data) => operations.changePassword.meQueryUpdaterDelegate(result, data)
      )
  }
}

export default login
