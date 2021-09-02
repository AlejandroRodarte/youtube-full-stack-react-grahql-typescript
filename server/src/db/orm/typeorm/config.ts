import path from 'path'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

import entities from '../entities'

const config: PostgresConnectionOptions = {
  url: process.env.POSTGRES_URL,
  type: 'postgres',
  logging: process.env.NODE_ENV === 'development',
  synchronize: process.env.NODE_ENV === 'development',
  entities,
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
    : undefined
}

export = config
