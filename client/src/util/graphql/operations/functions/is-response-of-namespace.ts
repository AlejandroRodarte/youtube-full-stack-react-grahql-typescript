import { GraphQLNamespaces } from '../../../../types/graphql/operations/namespaces'

export default function isResponseOfNamespace<S extends G, G extends GraphQLNamespaces.WithNamespace<G>> (
  response: G,
  key: keyof G,
  namespace: GraphQLNamespaces.Namespaces
): response is S {
  return response[key].namespace === namespace
}
