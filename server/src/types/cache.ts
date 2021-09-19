
import User from './../db/orm/entities/User'
import Updoot from './../db/orm/entities/Updoot'

import { DBRawEntities } from './db'

export namespace CacheTypes {
  export interface UserDataLoaderMap {
    [key: string]: User
  }

  export interface UpdootDataLoaderKey {
    userId: number
    postId: number
  }

  export interface UpdootDataLoaderMap {
    [key: string]: Updoot
  }

  export interface PostTrendingScoreDataLoaderKey {
    postId: number
    timestamp: string
  }

  export interface PostTrendingScoreDataLoaderMap {
    [key: string]: DBRawEntities.PostTrendingScoreRawEntity
  }
}
