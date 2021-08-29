import { ApolloServer, ExpressContext } from 'apollo-server-express'
import { Request, Response } from 'express'
import { GraphQLSchema } from 'graphql'
import { Redis } from 'ioredis'
import TypeORM from 'typeorm'

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
  db: TypeORM.Connection
  redis: Redis
}
