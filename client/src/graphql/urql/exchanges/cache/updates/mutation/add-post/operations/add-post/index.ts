import { Cache } from '@urql/exchange-graphcache'

import { AddPostMutation } from '../../../../../../../../../generated/graphql'

import modes from './modes'
import { GraphQLUrqlCache } from '../../../../../../../../../types/graphql/urql/cache'

// update handler for AddPost operationName
const handleAddPostOperation = (mode: GraphQLUrqlCache.AddPostResolverAddPostOperationUpdateModes, result: AddPostMutation, cache: Cache) => {
  // delegate task to different handlers depending on the mode
  // push: push added post to the top of the query that has the newest posts
  // invalidate: invalidate all Query.posts(args) queries we have made so far
  switch (mode) {
    case 'push':
      return modes.handlePushMode(result, cache)
    case 'invalidate-all':
      return modes.handleInvalidateAllMode(cache)
    default:
      return modes.handlePushMode(result, cache)
  }
}

export default handleAddPostOperation
