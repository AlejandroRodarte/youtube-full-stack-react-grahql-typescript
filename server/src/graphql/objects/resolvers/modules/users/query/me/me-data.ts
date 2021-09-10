import { ObjectType, Field } from 'type-graphql'

import User from '../../../../../../../db/orm/entities/User'

@ObjectType()
export default class MeData {
  @Field(() => User)
  user: User

  constructor (user: User) {
    this.user = user
  }
}
