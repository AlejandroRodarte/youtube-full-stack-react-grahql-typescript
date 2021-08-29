import { createConnection as createTypeORMConnection } from 'typeorm'

import config from './config'
import { CreateConnectionTuple } from '../../../types/db'

export namespace TypeORMConnection {
  const tuple: CreateConnectionTuple = [
    undefined,
    undefined
  ]

  export async function createConnection () {
    if (typeof tuple[0] === 'undefined') {
      try {
        const orm = await createTypeORMConnection(config)
        tuple[0] = orm
      } catch (e) {
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