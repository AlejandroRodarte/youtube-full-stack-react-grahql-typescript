import { CacheExchangeOpts, cacheExchange } from '@urql/exchange-graphcache'

import updates from './updates'
import keys from './keys'

const cacheExchangeConfig: CacheExchangeOpts = {
  updates,
  keys
}

export default cacheExchange(cacheExchangeConfig)
