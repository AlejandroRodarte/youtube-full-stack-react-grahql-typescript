import { ObjectType, Field, Int } from 'type-graphql'

import UpdootDto from '../../../../../dtos/updoots/updoot-dto'

@ObjectType()
export default class VoteData {
  @Field(() => Int)
  postPoints: number

  @Field(() => UpdootDto, { nullable: true })
  updoot?: UpdootDto

  constructor (postPoints: number, updoot?: UpdootDto) {
    this.postPoints = postPoints
    this.updoot = updoot
  }
}
