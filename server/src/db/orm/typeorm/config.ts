import path from 'path'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

import CustomNamingStrategy from './custom-naming-strategy'

const config: PostgresConnectionOptions = {
  url: process.env.POSTGRES_URL,
  type: 'postgres',
  logging: process.env.NODE_ENV === 'development',
  synchronize: process.env.NODE_ENV === 'development',
  entities: [
    path.join(__dirname, '..', 'entities/**/*{.ts,.js}')
  ],
  migrations: [
    path.join(__dirname, '..', 'migrations/**/*{.ts,.js}')
  ],
  cli: {
    migrationsDir: 'src/db/orm/migrations'
  },
  ssl: process.env.NODE_ENV === 'production'
    ? {
        rejectUnauthorized: false
      }
    : undefined,
  namingStrategy: new CustomNamingStrategy()
}

export = config
