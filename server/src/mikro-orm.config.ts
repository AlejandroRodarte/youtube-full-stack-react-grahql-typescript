import path from 'path';

import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Post } from './entities/Post';

const config: Options<PostgreSqlDriver> = {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    dbName: process.env.POSTGRES_DATABASE,
    port: +(process.env.POSTGRESS_PORT || '5432'),
    debug: process.env.NODE_ENV === 'development',
    type: 'postgresql',
    entities: [Post],
    migrations: {
        path: path.join(__dirname, './migrations'),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
};

export default config;
