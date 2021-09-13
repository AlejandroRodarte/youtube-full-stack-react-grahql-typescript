import { UpdateResolver } from '@urql/exchange-graphcache'

import { MeQuery, MeDocument, MutationRegisterArgs, RegisterMutation } from '../../../../../../../generated/graphql'

import operations from './operations'
import isResponseOfNamespace from '../../../../../../../util/graphql/operations/functions/is-response-of-namespace'

import { GraphQLUsersOperations } from '../../../../../../../types/graphql/operations/users'

const register: UpdateResolver<GraphQLUsersOperations.RegisterOperationResponse, MutationRegisterArgs> = (
  result,
  args,
  cache,
  info
) => {
  if (isResponseOfNamespace<RegisterMutation, GraphQLUsersOperations.RegisterOperationResponse>(result, 'register', 'Register')) {
    return cache
      .updateQuery<MeQuery>(
        { query: MeDocument },
        (data) => operations.register.meQueryUpdaterDelegate(result, data)
      )
  }
}

export default register
