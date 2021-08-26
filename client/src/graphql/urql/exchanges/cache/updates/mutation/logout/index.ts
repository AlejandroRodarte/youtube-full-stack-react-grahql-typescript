import { UpdateResolver } from '@urql/exchange-graphcache'
import { LogoutOperationResponse } from '../../../../../../../types/graphql/operations/users'
import isResponseOfKind from '../../../../../../../util/graphql/operations/functions/is-response-of-kind'
import { LogoutMutation, MeQuery, MeDocument } from '../../../../../../../generated/graphql'
import * as OperationUtilities from './operations'

const logout: UpdateResolver<LogoutOperationResponse> = (
  result,
  args,
  cache,
  info
) => {
  if (isResponseOfKind<LogoutMutation, LogoutOperationResponse>(result, 'logout', 'Logout')) {
    return cache
      .updateQuery<MeQuery>(
        { query: MeDocument },
        (data) => OperationUtilities.LogoutMutationOperation.meQueryUpdaterDelegate(data)
      )
  }
}

export default logout
