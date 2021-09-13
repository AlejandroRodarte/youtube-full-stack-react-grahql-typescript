import { ObjectType, Field } from 'type-graphql'

import Updoot from '../../../../../../../db/orm/entities/Updoot'

@ObjectType()
export default class VoteData {
  @Field(() => Updoot)
  updoot: Updoot

  constructor (updoot: Updoot) {
    this.updoot = updoot
  }
}
