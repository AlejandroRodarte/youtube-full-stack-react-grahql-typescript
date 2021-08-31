import { CorsOptions } from 'apollo-server-express'

const origins = [process.env.CORS_ORIGIN!]

if (process.env.INCLUDE_APOLLO_STUDIO === 'true') origins.push('https://studio.apollographql.com')

const corsOptions: CorsOptions = {
  origin: origins,
  credentials: true,
  exposedHeaders: ['Access-Control-Allow-Origin', 'Access-Control-Allow-Credentials']
}

export default corsOptions
