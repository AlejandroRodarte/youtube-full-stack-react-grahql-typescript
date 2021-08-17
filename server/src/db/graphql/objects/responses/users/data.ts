import { ObjectType, Field } from 'type-graphql'

import { User } from '../../../../orm/entities/user'

@ObjectType()
export class RegisterUserData {
  @Field(() => User)
  newUser!: User

  constructor (user: User) {
    this.newUser = user
  }
}
