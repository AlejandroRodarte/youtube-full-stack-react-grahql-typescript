import { buildSchema } from 'type-graphql';
import resolvers from './resolvers';

import { CreateSchemaTuple } from 'src/types/db/graphql';

const createSchema = async (): Promise<CreateSchemaTuple> => {

    try {

        const schema = await buildSchema({
            resolvers,
            validate: false,
        });
    
        return [schema, undefined];

    } catch (e) {
        return [undefined, e];
    }


};

export default createSchema;

