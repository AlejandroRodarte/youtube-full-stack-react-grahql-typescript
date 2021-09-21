export namespace CacheTypes {
  export interface LoaderMap<T> {
    [key: string]: T
  }

  export interface UpdootPrimaryKey {
    userId: number
    postId: number
  }

  export interface PostTrendingScoreDataLoaderKey {
    postId: number
    timestamp: string
  }

}
