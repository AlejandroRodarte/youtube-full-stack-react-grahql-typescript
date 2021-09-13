import 'type-graphql/dist/interfaces'

import { GraphQLInputs } from '../../../../graphql'

declare module 'type-graphql/dist/interfaces' {
  export interface ArgsDictionary {
    namespace: string,
    data: GraphQLInputs.InputPayload
  }
}
