import { CacheExchangeOpts, cacheExchange } from '@urql/exchange-graphcache'

import resolvers from './resolvers'
import updates from './updates'
import keys from './keys'

const cacheExchangeConfig: CacheExchangeOpts = {
  resolvers,
  updates,
  keys
}

export default cacheExchange(cacheExchangeConfig)
