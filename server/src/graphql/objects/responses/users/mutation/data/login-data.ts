import { ObjectType, Field } from 'type-graphql'

import User from '../../../../../../db/orm/entities/User'

@ObjectType()
export default class LoginData {
  @Field(() => User)
  user: User

  constructor (user: User) {
    this.user = user
  }
}
