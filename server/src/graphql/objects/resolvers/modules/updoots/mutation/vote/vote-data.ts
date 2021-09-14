import { ObjectType, Field, Int } from 'type-graphql'

import Updoot from '../../../../../../../db/orm/entities/Updoot'

@ObjectType()
export default class VoteData {
  @Field(() => Updoot)
  updoot: Updoot

  @Field(() => Int)
  postPoints: number

  constructor (updoot: Updoot, postPoints: number) {
    this.updoot = updoot
    this.postPoints = postPoints
  }
}
