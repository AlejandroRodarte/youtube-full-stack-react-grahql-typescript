import { Server } from 'https'
import { Express } from 'express'

export namespace AppTuples {
  export type CreateAppTuple = [
    Server | Express | undefined,
    Error | undefined
  ]
}
