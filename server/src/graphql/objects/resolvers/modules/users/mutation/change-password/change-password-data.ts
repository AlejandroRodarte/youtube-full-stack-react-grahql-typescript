import { ObjectType, Field } from 'type-graphql'

import User from '../../../../../../../db/orm/entities/User'

@ObjectType()
export default class ChangePasswordData {
  @Field(() => User)
  updatedUser: User

  constructor (updatedUser: User) {
    this.updatedUser = updatedUser
  }
}
