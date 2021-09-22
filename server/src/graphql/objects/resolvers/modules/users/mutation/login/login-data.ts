import { ObjectType, Field } from 'type-graphql'

import UserDto from '../../../../../dtos/users/user-dto'

@ObjectType()
export default class LoginData {
  @Field(() => UserDto)
  user: UserDto

  constructor (user: UserDto) {
    this.user = user
  }
}
