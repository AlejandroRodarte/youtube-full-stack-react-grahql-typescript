import { MeQuery, MeDocument, MutationLoginArgs, LoginMutation } from '../../../../../../../generated/graphql'
import { UpdateResolver } from '@urql/exchange-graphcache'
import { LoginOperationResponse } from '../../../../../../../types/graphql/operations/users'
import isResponseOfKind from '../../../../../../../util/graphql/operations/functions/is-response-of-kind'
import * as OperationUtilities from './operations'

const login: UpdateResolver<LoginOperationResponse, MutationLoginArgs> = (
  result,
  args,
  cache,
  info
) => {
  if (isResponseOfKind<LoginMutation, LoginOperationResponse>(result, 'login', 'Login')) {
    return cache
      .updateQuery<MeQuery>(
        { query: MeDocument },
        (data) => OperationUtilities.LoginMutationOperation.meQueryUpdaterDelegate(result, data)
      )
  }
}

export default login
