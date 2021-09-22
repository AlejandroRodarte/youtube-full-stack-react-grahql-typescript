import { ObjectType, Field } from 'type-graphql'

import UserDto from '../../../../../dtos/users/user-dto'

@ObjectType()
export default class ChangePasswordData {
  @Field(() => UserDto)
  updatedUser: UserDto

  constructor (updatedUser: UserDto) {
    this.updatedUser = updatedUser
  }
}
