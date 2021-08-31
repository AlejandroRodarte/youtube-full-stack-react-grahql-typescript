export namespace GraphQLUrqlCache {
  export type UpdaterDelegateFunction<ResultType, QueryType> = (result: ResultType, query: QueryType) => QueryType
}
