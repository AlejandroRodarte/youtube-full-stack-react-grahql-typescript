import updates from './updates'
import keys from './keys'
import { CacheExchangeOpts } from '@urql/exchange-graphcache'

const cacheExchangeConfig: CacheExchangeOpts = {
  updates,
  keys
}

export default cacheExchangeConfig
