import { CorsOptions } from 'apollo-server-express'

const corsOptions: CorsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  exposedHeaders:
    process.env.NODE_ENV === 'development' &&
    process.env.CLIENT_NICKNAME === 'apollo-studio'
      ? ['Access-Control-Allow-Origin', 'Access-Control-Allow-Credentials']
      : undefined
}

export default corsOptions
