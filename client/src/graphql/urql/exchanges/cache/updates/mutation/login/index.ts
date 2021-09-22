import { UpdateResolver } from '@urql/exchange-graphcache'

import { MeQuery, MeDocument, MutationLoginArgs, LoginMutation } from '../../../../../../../generated/graphql'

import operations from './operations'
import isResponseOfNamespace from '../../../../../../../util/graphql/operations/functions/is-response-of-namespace'
import invalidateAllResolverCache from '../../../../../../../util/graphql/urql/invalidate-all-resolver-cache'

import { GraphQLUsersOperations } from '../../../../../../../types/graphql/operations/users'

const login: UpdateResolver<GraphQLUsersOperations.LoginOperationResponse, MutationLoginArgs> = (
  result,
  args,
  cache,
  info
) => {
  if (isResponseOfNamespace<LoginMutation, GraphQLUsersOperations.LoginOperationResponse>(result, 'login', 'Login')) {
    if (
      result.login.status === 400 ||
      result.login.status === 404 ||
      result.login.errors
    ) return

    invalidateAllResolverCache(cache, [
      {
        name: 'posts',
        namespaces: ['Posts']
      }
    ])

    return cache
      .updateQuery<MeQuery>(
        { query: MeDocument },
        (data) => operations.login.meQueryUpdaterDelegate(result, data)
      )
  }
}

export default login
