/* eslint-disable no-unused-vars */
type KindableResponse<T> = {
  __typename?: 'Query' | 'Mutation' | 'Subscription'
} & {
  [key in keyof T]: {
    _kind?: string
  }
}

export default function isResponseOfKind<S extends G, G extends KindableResponse<G>> (response: G, key: keyof G, kind: string): response is S {
  return response[key]._kind === kind
}
