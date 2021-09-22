import { ObjectType, Field, Int } from 'type-graphql'

import Updoot from '../../../../../../../db/orm/entities/Updoot'

@ObjectType()
export default class VoteData {
  @Field(() => Int)
  postPoints: number

  @Field(() => Updoot, { nullable: true })
  updoot?: Updoot

  constructor (postPoints: number, updoot?: Updoot) {
    this.postPoints = postPoints
    this.updoot = updoot
  }
}
