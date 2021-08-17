import express from 'express'

import { CreateAppTuple } from './types/app'
import createApolloServer from './graphql/apollo/create-apollo-server'

const createApp = async (): Promise<CreateAppTuple> => {
  const [apolloServer, apolloServerError] = await createApolloServer()
  if (typeof apolloServer === 'undefined') return [undefined, apolloServerError]
  const app = express()
  apolloServer.applyMiddleware({ app })
  return [app, undefined]
}

export default createApp
