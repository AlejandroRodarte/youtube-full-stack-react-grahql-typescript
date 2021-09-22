import { ObjectType, Field } from 'type-graphql'

import UserDto from '../../../../../dtos/users/user-dto'

@ObjectType()
export default class RegisterData {
  @Field(() => UserDto)
  newUser: UserDto

  constructor (user: UserDto) {
    this.newUser = user
  }
}
