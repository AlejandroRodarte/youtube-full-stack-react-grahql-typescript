import { UpdateResolver } from '@urql/exchange-graphcache'

import { MeQuery, MeDocument, MutationLoginArgs, LoginMutation } from '../../../../../../../generated/graphql'

import operations from './operations'
import isResponseOfKind from '../../../../../../../util/graphql/operations/functions/is-response-of-kind'

import { GraphQLUsersOperations } from '../../../../../../../types/graphql/operations/users'

const login: UpdateResolver<GraphQLUsersOperations.LoginOperationResponse, MutationLoginArgs> = (
  result,
  args,
  cache,
  info
) => {
  if (isResponseOfKind<LoginMutation, GraphQLUsersOperations.LoginOperationResponse>(result, 'login', 'Login')) {
    return cache
      .updateQuery<MeQuery>(
        { query: MeDocument },
        (data) => operations.login.meQueryUpdaterDelegate(result, data)
      )
  }
}

export default login
