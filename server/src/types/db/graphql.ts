import { ApolloServer, ExpressContext } from 'apollo-server-express';
import { GraphQLSchema } from 'graphql';

export type CreateSchemaTuple = [GraphQLSchema | undefined, Error | undefined];
export type CreateApolloServerTuple = [ApolloServer<ExpressContext> | undefined, Error | undefined];
