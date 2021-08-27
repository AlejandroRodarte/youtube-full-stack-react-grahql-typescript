import { User } from '../../db/orm/entities/user'

import 'express'

declare module 'express' {
  export interface Request {
    user: User | undefined,
    body: {
      operationName: string | undefined
    }
  }
}
