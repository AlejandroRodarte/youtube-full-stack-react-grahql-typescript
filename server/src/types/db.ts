import TypeORM from 'typeorm'

export type CreateConnectionTuple = [
  TypeORM.Connection | undefined,
  Error | undefined
]

export interface UpdatePostRawEntity {
  id: number
  createdAt: Date
  updatedAt: Date
  title: string
}

export interface UpdateUserRawEntity {
  id: number
  createdAt: Date
  updatedAt: Date
  username: string
  email: string
  password: string
}
