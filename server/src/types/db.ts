/* eslint-disable camelcase */
import TypeORM from 'typeorm'

export namespace DBTuples {
  export type CreateConnectionTuple = [
    TypeORM.Connection | undefined,
    Error | undefined
  ]
}

export namespace DBRawEntities {
  export interface PostRawEntity {
    id: number
    createdAt: Date
    updatedAt: Date
    title: string
    text: string
    points: number
    originalPosterId: number
  }

  export interface UserRawEntity {
    id: number
    createdAt: Date
    updatedAt: Date
    username: string
    email: string
    password: string
  }

  export interface UpdootRawEntity {
    userId: number
    postId: number
    value: number
    createdAt: Date
    updatedAt: Date
  }

  export interface PostTrendingScoreRawEntity {
    postId: number
    trendingScore: number
  }

  export interface PostWithTrendingScoreRawEntity extends PostRawEntity {
    trendingscore: string
  }

  export interface UpdootWithAliasRawEntity {
    updoot_userId: number
    updoot_postId: number
    updoot_value: number
    updoot_createdAt: Date
    updoot_updatedAt: Date
  }
}
