import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

import entities from '../entities'

const config: PostgresConnectionOptions = {
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  port: +(process.env.POSTGRESS_PORT || '5432'),
  type: 'postgres',
  logging: process.env.NODE_ENV === 'development',
  synchronize: process.env.NODE_ENV === 'development',
  entities
}

export default config
