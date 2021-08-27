import Redis from 'ioredis'
import session from 'express-session'
import connectRedis from 'connect-redis'

const RedisStore = connectRedis(session)
const redisClient = new Redis()

const sessionStore = new RedisStore({
  client: redisClient,
  disableTouch: true // keep the session forever
})

export {
  sessionStore as default,
  redisClient
}
