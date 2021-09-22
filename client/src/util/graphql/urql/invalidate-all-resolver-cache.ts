import { Cache } from '@urql/exchange-graphcache'
import { GraphQLNamespaces } from '../../../types/graphql/operations/namespaces'

interface Resolver {
  name: string
  namespaces: GraphQLNamespaces.Namespaces[]
}

export default function invalidateAllResolverCache (cache: Cache, resolvers: Resolver[]) {
  const queriesInfo = cache.inspectFields('Query')

  resolvers.forEach((resolver) => {
    resolver.namespaces.forEach((namespace) => {
      const fieldInfos = queriesInfo.filter(
        (info) =>
          info.fieldName === resolver.name &&
          (info.arguments.namespace as GraphQLNamespaces.Namespaces) === namespace
      )
      fieldInfos.forEach((fieldInfo) => {
        cache.invalidate('Query', resolver.name, fieldInfo.arguments)
      })
    })
  })
}
