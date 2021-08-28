import { MeQuery, MeDocument, MutationChangePasswordArgs, ChangePasswordMutation } from '../../../../../../../generated/graphql'
import { UpdateResolver } from '@urql/exchange-graphcache'
import { ChangePasswordOperationResponse } from '../../../../../../../types/graphql/operations/users'
import isResponseOfKind from '../../../../../../../util/graphql/operations/functions/is-response-of-kind'
import * as OperationUtilities from './operations'

const login: UpdateResolver<ChangePasswordOperationResponse, MutationChangePasswordArgs> = (
  result,
  args,
  cache,
  info
) => {
  if (isResponseOfKind<ChangePasswordMutation, ChangePasswordOperationResponse>(result, 'changePassword', 'ChangePassword')) {
    return cache
      .updateQuery<MeQuery>(
        { query: MeDocument },
        (data) => OperationUtilities.ChangePasswordMutationOperation.meQueryUpdaterDelegate(result, data)
      )
  }
}

export default login
