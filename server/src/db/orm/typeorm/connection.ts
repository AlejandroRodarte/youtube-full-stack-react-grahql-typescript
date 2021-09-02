import { createConnection as createTypeORMConnection } from 'typeorm'

import config from './config'

import { DBTuples } from '../../../types/db'

export namespace TypeORMConnection {
  const tuple: DBTuples.CreateConnectionTuple = [
    undefined,
    undefined
  ]

  export async function createConnection () {
    if (typeof tuple[0] === 'undefined') {
      try {
        const orm = await createTypeORMConnection(config)
        if (process.env.NODE_ENV === 'production') await orm.runMigrations()
        tuple[0] = orm
      } catch (e) {
        if (process.env.LOG_ERRORS === 'true') console.error(e)
        tuple[1] = e
      }
    }
    return tuple
  }

  export function getConnection () {
    if (typeof tuple[0] === 'undefined') throw new Error('Error connecting to the database')
    return tuple[0]
  }
}
