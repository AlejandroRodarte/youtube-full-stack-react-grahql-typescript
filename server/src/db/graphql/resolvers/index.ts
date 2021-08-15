import { NonEmptyArray } from 'type-graphql';

import HelloResolver from './hello-resolver';

const resolvers: NonEmptyArray<Function> = [HelloResolver];

export default resolvers;
