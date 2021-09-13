import { InputType, Field, Int } from 'type-graphql'

import { UpdootTypes } from '../../../../../../../../types/updoots'

@InputType()
export default class VoteInput {
  @Field(() => Int)
  postId: number

  @Field(() => Int)
  value: UpdootTypes.UpdootValues
}
