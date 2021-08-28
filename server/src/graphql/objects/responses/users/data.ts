import { ObjectType, Field } from 'type-graphql'

import { User } from '../../../../db/orm/entities/user'

@ObjectType()
export class RegisterUserData {
  @Field(() => User)
  newUser: User

  constructor (user: User) {
    this.newUser = user
  }
}

@ObjectType()
export class LoginUserData {
  @Field(() => User)
  user: User

  constructor (user: User) {
    this.user = user
  }
}

@ObjectType()
export class MeUserData extends LoginUserData {}

@ObjectType()
export class LogoutUserData {
  @Field(() => Boolean)
  wasSessionDestroyed: boolean

  constructor (wasSessionDestroyed: boolean) {
    this.wasSessionDestroyed = wasSessionDestroyed
  }
}

@ObjectType()
export class ForgotPasswordData {
  @Field(() => Boolean)
  wasEmailSent: boolean

  constructor (wasEmailSent: boolean) {
    this.wasEmailSent = wasEmailSent
  }
}

@ObjectType()
export class ChangePasswordData {
  @Field(() => User)
  updatedUser: User

  constructor (updatedUser: User) {
    this.updatedUser = updatedUser
  }
}
