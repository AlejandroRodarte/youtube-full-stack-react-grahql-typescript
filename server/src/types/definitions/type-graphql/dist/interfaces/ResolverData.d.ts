import 'type-graphql/dist/interfaces'

import { GraphQLInputs } from '../../../../graphql'

declare module 'type-graphql/dist/interfaces' {
  export interface ArgsDictionary {
    data: GraphQLInputs.InputPayload
  }
}
