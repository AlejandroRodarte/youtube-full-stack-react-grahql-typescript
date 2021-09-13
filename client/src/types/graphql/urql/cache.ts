import { ResolveInfo, Cache } from '@urql/exchange-graphcache'
export namespace GraphQLUrqlCache {
  export type UpdaterDelegateFunction<ResultType, QueryType> = (result: ResultType, query: QueryType) => QueryType
  export type PostsPaginatorDelegateFunction<ParentType, ArgsType> = (parent: ParentType, args: ArgsType, cache: Cache, info: ResolveInfo) => object
  export type AddPostResolverAddPostOperationUpdateModes = 'invalidate-all' | 'push'
}
