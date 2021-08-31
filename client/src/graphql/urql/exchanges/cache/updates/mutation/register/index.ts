import { UpdateResolver } from '@urql/exchange-graphcache'

import { MeQuery, MeDocument, MutationRegisterArgs, RegisterMutation } from '../../../../../../../generated/graphql'

import operations from './operations'
import isResponseOfKind from '../../../../../../../util/graphql/operations/functions/is-response-of-kind'

import { GraphQLUsersOperations } from '../../../../../../../types/graphql/operations/users'

const register: UpdateResolver<GraphQLUsersOperations.RegisterOperationResponse, MutationRegisterArgs> = (
  result,
  args,
  cache,
  info
) => {
  if (isResponseOfKind<RegisterMutation, GraphQLUsersOperations.RegisterOperationResponse>(result, 'register', 'Register')) {
    return cache
      .updateQuery<MeQuery>(
        { query: MeDocument },
        (data) => operations.register.meQueryUpdaterDelegate(result, data)
      )
  }
}

export default register
