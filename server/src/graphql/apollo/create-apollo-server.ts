import fs from 'fs'
import path from 'path'
import { ApolloServer, ExpressContext } from 'apollo-server-express'
import { printSchema } from 'graphql'

import createSchema from '../schema/create-schema'
import { CreateApolloServerTuple, ApplicationContext } from '../../types/graphql'
import { redisClient } from '../../redis'
import { TypeORMConnection } from '../../db/orm/typeorm/connection'

const createApolloServer = async (): Promise<CreateApolloServerTuple> => {
  const [
    orm,
    ormError
  ] = await TypeORMConnection.createConnection()

  if (typeof orm === 'undefined') {
    return [
      undefined,
      ormError
    ]
  }

  const [
    schema,
    schemaError
  ] = await createSchema()

  if (typeof schema === 'undefined') {
    return [
      undefined,
      schemaError
    ]
  }

  if (process.env.NODE_ENV === 'development') {
    fs.writeFileSync(
      path.join(
        __dirname,
        '..',
        './schema/schema.graphql'
      ),
      printSchema(schema)
    )
  }

  const context = {
    redis: redisClient,
    db: orm
  }

  const apolloServer = new ApolloServer({
    schema,
    context: ({
      req,
      res
    }: ExpressContext): ApplicationContext => ({
      req,
      res,
      ...context
    })
  })

  await apolloServer.start()

  return [
    apolloServer,
    undefined
  ]
}

export default createApolloServer
