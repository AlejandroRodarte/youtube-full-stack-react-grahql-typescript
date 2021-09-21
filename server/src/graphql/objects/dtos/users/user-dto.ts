import { Field, ObjectType, Int } from 'type-graphql'

import User from '../../../../db/orm/entities/User'
import { DBRawEntities } from '../../../../types/db'

@ObjectType()
export default class UserDto {
  @Field(() => Int)
  id: number

  @Field(() => String)
  username: string

  @Field(() => String, { nullable: true })
  email: string

  @Field(() => String)
  createdAt: Date

  @Field(() => String)
  updatedAt: Date

  constructor (
    id: number,
    username: string,
    email: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id
    this.username = username
    this.email = email
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  static fromUserEntity (user: User) {
    return new UserDto(
      user.id,
      user.username,
      user.email,
      user.createdAt,
      user.updatedAt
    )
  }

  static fromUserEntityArray (users: User[]) {
    return users.map((user) => new UserDto(
      user.id,
      user.username,
      user.email,
      user.createdAt,
      user.updatedAt
    ))
  }

  static fromUserRawEntity (user: DBRawEntities.UserRawEntity) {
    return new UserDto(
      user.id,
      user.username,
      user.email,
      user.createdAt,
      user.updatedAt
    )
  }
}
