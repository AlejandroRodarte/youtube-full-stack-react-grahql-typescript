import { Server } from 'https'
import { Express } from 'express'

export type CreateAppTuple = [
  Server | Express | undefined,
  Error | undefined
]
