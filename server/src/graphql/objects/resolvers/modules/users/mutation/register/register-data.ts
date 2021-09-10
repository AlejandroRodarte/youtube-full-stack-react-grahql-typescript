import { ObjectType, Field } from 'type-graphql'

import User from '../../../../../../../db/orm/entities/User'

@ObjectType()
export default class RegisterData {
  @Field(() => User)
  newUser: User

  constructor (user: User) {
    this.newUser = user
  }
}
