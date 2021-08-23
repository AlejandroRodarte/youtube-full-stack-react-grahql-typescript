import { CorsOptions } from 'apollo-server-express'

const corsOptions: CorsOptions = {
  origin: [
    process.env.CORS_ORIGIN!,
    'https://studio.apollographql.com'
  ],
  credentials: true,
  exposedHeaders:
    process.env.NODE_ENV === 'development' &&
    process.env.CLIENT_NICKNAME === 'apollo-studio'
      ? ['Access-Control-Allow-Origin', 'Access-Control-Allow-Credentials']
      : undefined
}

export default corsOptions
