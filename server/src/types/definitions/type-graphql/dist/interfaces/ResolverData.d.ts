import 'type-graphql/dist/interfaces'

import { InputPayload } from '../../../../args'

declare module 'type-graphql/dist/interfaces' {
  export interface ArgsDictionary {
    data: InputPayload
  }
}
