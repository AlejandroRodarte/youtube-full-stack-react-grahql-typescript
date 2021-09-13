import 'typeorm/error/QueryFailedError'

import { GraphQLConstants } from '../../../graphql'

declare module 'typeorm/error/QueryFailedError' {
  export interface QueryFailedError {
    constraint?: GraphQLConstants.ConstraintNames
  }
}
