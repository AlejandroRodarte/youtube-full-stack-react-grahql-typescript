import { MikroORM } from '@mikro-orm/core'

import config from './mikro-orm.config'
import { CreateConnectionTuple } from '../../types/db/orm'

export namespace MikroORMConnection {
    const tuple: CreateConnectionTuple = [undefined, undefined]
    export async function createConnection () {
      if (typeof tuple[0] === 'undefined') {
        try {
          const orm = await MikroORM.init(config)
          await orm.getMigrator().up()
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
