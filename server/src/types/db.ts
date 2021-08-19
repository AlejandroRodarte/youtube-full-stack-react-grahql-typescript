import { MikroORM } from '@mikro-orm/core'
import { PostgreSqlDriver } from '@mikro-orm/postgresql'

export type CreateConnectionTuple = [
  MikroORM<PostgreSqlDriver> | undefined,
  Error | undefined
]
