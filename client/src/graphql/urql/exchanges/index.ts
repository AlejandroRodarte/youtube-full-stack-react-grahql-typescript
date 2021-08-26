import { Exchange, dedupExchange, fetchExchange } from 'urql'
import { cacheExchange } from '@urql/exchange-graphcache'
import cacheExchangeConfig from './cache'

const exchanges: Exchange[] = [
  dedupExchange,
  cacheExchange(cacheExchangeConfig),
  fetchExchange
]

export default exchanges
