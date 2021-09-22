import { Cache } from '@urql/exchange-graphcache'

import modes from './modes'

import { VoteMutation, MutationVoteArgs } from '../../../../../../../../../generated/graphql'
import { GraphQLUrqlCache } from '../../../../../../../../../types/graphql/urql/cache'

const handleVoteOperation = (mode: GraphQLUrqlCache.VoteResolverVoteOperationUpdateModes, result: VoteMutation, args: MutationVoteArgs, cache: Cache) => {
  switch (mode) {
    case 'server':
      return modes.handleServerMode(result, args, cache)
    case 'client':
      return modes.handleClientMode(result, args, cache)
    default:
      return modes.handleServerMode(result, args, cache)
  }
}

export default handleVoteOperation
