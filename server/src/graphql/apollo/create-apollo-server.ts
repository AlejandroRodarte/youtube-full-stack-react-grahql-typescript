import fs from 'fs'
import path from 'path'
import { ApolloServer } from 'apollo-server-express'
import { printSchema } from 'graphql'

import createSchema from '../schema/create-schema'
import { TypeORMConnection } from '../../db/orm/typeorm/connection'

import { GraphQLTuples } from '../../types/graphql'
import generateContext from './generate-context'

const createApolloServer = async (): Promise<GraphQLTuples.CreateApolloServerTuple> => {
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

  const apolloServer = new ApolloServer({
    schema,
    context: (expressContext) => generateContext(expressContext, orm)
  })

  await apolloServer.start()

  return [
    apolloServer,
    undefined
  ]
}

export default createApolloServer
