import { UpdateResolver } from '@urql/exchange-graphcache'

import { MeQuery, MeDocument, MutationLoginArgs, LoginMutation } from '../../../../../../../generated/graphql'

import operations from './operations'
import isResponseOfNamespace from '../../../../../../../util/graphql/operations/functions/is-response-of-namespace'

import { GraphQLUsersOperations } from '../../../../../../../types/graphql/operations/users'

const login: UpdateResolver<GraphQLUsersOperations.LoginOperationResponse, MutationLoginArgs> = (
  result,
  args,
  cache,
  info
) => {
  if (isResponseOfNamespace<LoginMutation, GraphQLUsersOperations.LoginOperationResponse>(result, 'login', 'Login')) {
    return cache
      .updateQuery<MeQuery>(
        { query: MeDocument },
        (data) => operations.login.meQueryUpdaterDelegate(result, data)
      )
  }
}

export default login
