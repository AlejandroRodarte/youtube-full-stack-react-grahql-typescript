import express from 'express'
import session from 'express-session'
import cors from 'cors'

import { CreateAppTuple } from './types/app'
import createApolloServer from './graphql/apollo/create-apollo-server'
import { corsOptions, sessionOptions } from './settings'
import mountLocalHttpsServer from './util/functions/server/mount-local-https-server'

const createApp = async (): Promise<CreateAppTuple> => {
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

  app.use(cors(corsOptions))
  app.use(session(sessionOptions))

  apolloServer.applyMiddleware({
    app,
    cors: false
  })

  if (process.env.NODE_ENV === 'development') return mountLocalHttpsServer(app)

  return [
    app,
    undefined
  ]
}

export default createApp
