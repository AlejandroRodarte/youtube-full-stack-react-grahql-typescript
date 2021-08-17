import { ObjectType, Field } from 'type-graphql'

import { User } from '../../../../db/orm/entities/user'

@ObjectType()
export class RegisterUserData {
  @Field(() => User)
  newUser!: User

  constructor (user: User) {
    this.newUser = user
  }
}

@ObjectType()
export class LoginUserData {
  @Field(() => User)
  user!: User

  constructor (user: User) {
    this.user = user
  }
}
