import { UpdateResolver } from '@urql/exchange-graphcache'

import { MeQuery, MeDocument, MutationRegisterArgs, RegisterMutation } from '../../../../../../../generated/graphql'

import operations from './operations'
import isResponseOfNamespace from '../../../../../../../util/graphql/operations/functions/is-response-of-namespace'
import invalidateAllResolverCache from '../../../../../../../util/graphql/urql/invalidate-all-resolver-cache'

import { GraphQLUsersOperations } from '../../../../../../../types/graphql/operations/users'

const register: UpdateResolver<GraphQLUsersOperations.RegisterOperationResponse, MutationRegisterArgs> = (
  result,
  args,
  cache,
  info
) => {
  if (isResponseOfNamespace<RegisterMutation, GraphQLUsersOperations.RegisterOperationResponse>(result, 'register', 'Register')) {
    if (
      result.register.status === 400 ||
      result.register.errors
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
        (data) => operations.register.meQueryUpdaterDelegate(result, data)
      )
  }
}

export default register
