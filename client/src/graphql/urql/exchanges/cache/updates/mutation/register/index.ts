import { RegisterOperationResponse } from '../../../../../../../types/graphql/operations/users'
import { MeDocument, MeQuery, MutationLoginArgs, RegisterMutation } from '../../../../../../../generated/graphql'
import { UpdateResolver } from '@urql/exchange-graphcache'
import isResponseOfKind from '../../../../../../../util/graphql/operations/functions/is-response-of-kind'
import * as OperationUtilities from './operations'

const register: UpdateResolver<RegisterOperationResponse, MutationLoginArgs> = (
  result,
  args,
  cache,
  info
) => {
  if (isResponseOfKind<RegisterMutation, RegisterOperationResponse>(result, 'register', 'Register')) {
    return cache
      .updateQuery<MeQuery>(
        { query: MeDocument },
        (data) => OperationUtilities.RegisterMutationOperation.meQueryUpdaterDelegate(result, data)
      )
  }
}

export default register
