import fs from 'fs'
import path from 'path'
import { ApolloServer, ExpressContext } from 'apollo-server-express'
import { printSchema } from 'graphql'

import { CreateApolloServerTuple, ApplicationContext } from '../../types/db/graphql'
import createSchema from './create-schema'
import { MikroORMConnection } from '../orm/mikro-orm-connection'

const createApolloServer = async (): Promise<CreateApolloServerTuple> => {
  const [orm, ormError] = await MikroORMConnection.createConnection()
  if (typeof orm === 'undefined') return [undefined, ormError]
  const [schema, schemaError] = await createSchema()
  if (typeof schema === 'undefined') return [undefined, schemaError]
  if (process.env.NODE_ENV === 'development') fs.writeFileSync(path.join(__dirname, './schema/schema.graphql'), printSchema(schema))
  const context = { db: orm.em }
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }: ExpressContext): ApplicationContext => ({ req, res, ...context })
  })
  await apolloServer.start()
  return [apolloServer, undefined]
}

export default createApolloServer
