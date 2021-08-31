import constants from './constants'
import redisClient from './redis-client'
import sessionStore from './session-store'

const redis = {
  constants,
  redisClient,
  sessionStore
}

export default redis
