import TypeORM from 'typeorm'

export namespace DBTuples {
  export type CreateConnectionTuple = [
    TypeORM.Connection | undefined,
    Error | undefined
  ]
}

export namespace DBRawEntities {
  export interface UpdatePostRawEntity {
    id: number
    createdAt: Date
    updatedAt: Date
    title: string
    text: string
    points: number
    originalPosterId: number
  }

  export interface UpdateUserRawEntity {
    id: number
    createdAt: Date
    updatedAt: Date
    username: string
    email: string
    password: string
  }

  export interface UpdateUpdootRawEntity {
    userId: number
    postId: number
    value: number
  }

  export interface PostTrendingScoreRawEntity {
    postId: number
    trendingScore: number
  }
}
