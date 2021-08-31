import Redis from 'ioredis'

const redisClient = new Redis(process.env.REDIS_URL, {
  tls: process.env.NODE_ENV === 'production'
    ? {
        rejectUnauthorized: false
      }
    : undefined
})

export default redisClient
