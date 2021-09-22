import { Cache } from '@urql/exchange-graphcache'

import invalidateAllResolverCache from '../../../../../../../../../../util/graphql/urql/invalidate-all-resolver-cache'

const handleInvalidateAllMode = (cache: Cache) => {
  invalidateAllResolverCache(cache, [
    {
      name: 'posts',
      namespaces: ['Posts']
    }
  ])
}

export default handleInvalidateAllMode
