import { UpdateResolver } from '@urql/exchange-graphcache'

import { MutationVoteArgs, VoteMutation } from '../../../../../../../generated/graphql'

import operations from './operations'
import isResponseOfNamespace from '../../../../../../../util/graphql/operations/functions/is-response-of-namespace'

import { GraphQLUsersOperations } from '../../../../../../../types/graphql/operations/users'

const vote: UpdateResolver<GraphQLUsersOperations.VoteOperationResponse, MutationVoteArgs> = (
  result,
  args,
  cache,
  info
) => {
  if (isResponseOfNamespace<VoteMutation, GraphQLUsersOperations.VoteOperationResponse>(result, 'vote', 'Vote')) {
    if (
      result.vote.status === 400 ||
      result.vote.status === 401 ||
      result.vote.status === 404 ||
      result.vote.errors
    ) return
    return operations.handleVoteOperation('server', result, args, cache)
  }
}

export default vote
