import { InputType, Field, Int } from 'type-graphql'

@InputType()
export default class DeletePostInput {
  @Field(() => Int)
  id: number
}
