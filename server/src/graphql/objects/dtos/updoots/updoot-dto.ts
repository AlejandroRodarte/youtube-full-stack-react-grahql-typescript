import { Field, ObjectType, Int } from 'type-graphql'

import Updoot from './../../../../db/orm/entities/Updoot'
import { DBRawEntities } from '../../../../types/db'

@ObjectType()
export default class UpdootDto {
  @Field(() => Int)
  userId: number

  @Field(() => Int)
  postId: number

  @Field(() => Int)
  value: number

  @Field(() => String)
  createdAt: Date

  @Field(() => String)
  updatedAt: Date

  constructor (
    userId: number,
    postId: number,
    value: number,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.userId = userId
    this.postId = postId
    this.value = value
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  static fromUpdootEntity (updoot: Updoot) {
    return new UpdootDto(
      updoot.userId,
      updoot.postId,
      updoot.value,
      updoot.createdAt,
      updoot.createdAt
    )
  }

  static fromUpdootRawEntity (updoot: DBRawEntities.UpdootRawEntity) {
    return new UpdootDto(
      updoot.userId,
      updoot.postId,
      updoot.value,
      updoot.createdAt,
      updoot.createdAt
    )
  }

  static fromUpdootWithAliasRawEntityArray (rawUpdoots: DBRawEntities.UpdootWithAliasRawEntity[]) {
    return rawUpdoots.map((rawUpdoot) => new UpdootDto(
      rawUpdoot.updoot_userId,
      rawUpdoot.updoot_postId,
      rawUpdoot.updoot_value,
      rawUpdoot.updoot_createdAt,
      rawUpdoot.updoot_updatedAt
    ))
  }

  static fromUpdootEntityArray (updoots: Updoot[]) {
    return updoots.map((updoot) => new UpdootDto(
      updoot.userId,
      updoot.postId,
      updoot.value,
      updoot.createdAt,
      updoot.updatedAt
    ))
  }
}
