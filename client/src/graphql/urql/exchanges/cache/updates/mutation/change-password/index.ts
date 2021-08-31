import { UpdateResolver } from '@urql/exchange-graphcache'

import { MeQuery, MeDocument, MutationChangePasswordArgs, ChangePasswordMutation } from '../../../../../../../generated/graphql'

import operations from './operations'
import isResponseOfKind from '../../../../../../../util/graphql/operations/functions/is-response-of-kind'

import { GraphQLUsersOperations } from '../../../../../../../types/graphql/operations/users'

const login: UpdateResolver<GraphQLUsersOperations.ChangePasswordOperationResponse, MutationChangePasswordArgs> = (
  result,
  args,
  cache,
  info
) => {
  if (isResponseOfKind<ChangePasswordMutation, GraphQLUsersOperations.ChangePasswordOperationResponse>(result, 'changePassword', 'ChangePassword')) {
    return cache
      .updateQuery<MeQuery>(
        { query: MeDocument },
        (data) => operations.changePassword.meQueryUpdaterDelegate(result, data)
      )
  }
}

export default login
