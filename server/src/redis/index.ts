import redisClient from './redis-client'
import sessionStore from './session-store'

const redis = {
  redisClient,
  sessionStore
}

export default redis
