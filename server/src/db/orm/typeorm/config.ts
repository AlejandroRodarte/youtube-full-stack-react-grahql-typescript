import path from 'path'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

import entities from '../entities'

const config: PostgresConnectionOptions = {
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  port: +(process.env.POSTGRES_PORT || '5432'),
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
