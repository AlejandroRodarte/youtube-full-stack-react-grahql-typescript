import { IDatabaseDriver, Connection, EntityManager } from '@mikro-orm/core'
import { SqlEntityManager, PostgreSqlDriver } from '@mikro-orm/postgresql'
import { ApolloServer, ExpressContext } from 'apollo-server-express'
import { Request, Response } from 'express'
import { GraphQLSchema } from 'graphql'
import { Redis } from 'ioredis'

export type CreateSchemaTuple = [
  GraphQLSchema | undefined,
  Error | undefined
]

export type CreateApolloServerTuple = [
  ApolloServer<ExpressContext> | undefined,
  Error | undefined
]

export type ApplicationContext = {
  req: Request,
  res: Response,
  db:
    SqlEntityManager<PostgreSqlDriver> &
    EntityManager<IDatabaseDriver<Connection>>
  redis: Redis
}
