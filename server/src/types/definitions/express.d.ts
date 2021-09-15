import User from './../../db/orm/entities/User'
import { GraphQLInputs } from '../../types/graphql'

import 'express'

type Optional<T, U> = {
  // eslint-disable-next-line no-unused-vars
  [K in T]?: U
};

declare module 'express' {
  export interface Request {
    user?: User
    body: {
      operationName?: string
    }
    inputs?: Optional<GraphQLInputs.ExpressInputFields, GraphQLInputs.InputAction>
  }
}
