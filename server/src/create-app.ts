import express from 'express'
import session from 'express-session'
import cors from 'cors'

import options from './options'

import createApolloServer from './graphql/apollo/create-apollo-server'
import mountHttpsServer from './util/functions/server/mount-https-server'

import { AppTuples } from './types/app'

const createApp = async (): Promise<AppTuples.CreateAppTuple> => {
  const [
    apolloServer,
    apolloServerError
  ] = await createApolloServer()

  if (typeof apolloServer === 'undefined') {
    return [
      undefined,
      apolloServerError
    ]
  }

  const app = express()

  if (process.env.NODE_ENV === 'production') app.set('trust proxy', 1)
  app.use(cors(options.cors))
  app.use(session(options.session))

  apolloServer.applyMiddleware({
    app,
    cors: false
  })

  if (process.env.HTTPS_SERVER === 'true') return mountHttpsServer(app)

  return [
    app,
    undefined
  ]
}

export default createApp
