import express from 'express'
import session from 'express-session'
import cors from 'cors'

import settings from './settings'

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

  app.use(cors(settings.cors))
  app.use(session(settings.session))

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
