import { User } from '../../db/orm/entities/User'
import { InputAction } from '../args'

import 'express'

declare module 'express' {
  export interface Request {
    user?: User
    body: {
      operationName?: string
    },
    input?: InputAction
  }
}
