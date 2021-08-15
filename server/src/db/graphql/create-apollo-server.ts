import { ApolloServer } from 'apollo-server-express';

import { CreateApolloServerTuple } from 'src/types/db/graphql';

import createSchema from './create-schema';

const createApolloServer = async (): Promise<CreateApolloServerTuple> => {

    const [schema, schemaError] = await createSchema();
    if (typeof schema === 'undefined') return [undefined, schemaError];

    const apolloServer = new ApolloServer({ schema });
    await apolloServer.start();
    return [apolloServer, undefined];

};


export default createApolloServer;
