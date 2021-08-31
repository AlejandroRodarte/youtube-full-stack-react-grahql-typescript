import Redis from 'ioredis'

const redisClient = new Redis(process.env.REDIS_TLS_URL, {
  tls: {}
})

export default redisClient
