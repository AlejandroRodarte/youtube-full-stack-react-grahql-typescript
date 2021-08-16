import express from 'express'

import createApolloServer from './db/graphql/create-apollo-server'
import { CreateAppTuple } from './types/app'

const createApp = async (): Promise<CreateAppTuple> => {
  const [apolloServer, apolloServerError] = await createApolloServer()
  if (typeof apolloServer === 'undefined') return [undefined, apolloServerError]
  const app = express()
  apolloServer.applyMiddleware({ app })
  return [app, undefined]
}

export default createApp
