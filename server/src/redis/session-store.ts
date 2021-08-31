import session from 'express-session'
import connectRedis from 'connect-redis'

import redisClient from './redis-client'

const RedisStore = connectRedis(session)

const sessionStore = new RedisStore({
  client: redisClient,
  disableTouch: true // keep the session forever
})

export default sessionStore
