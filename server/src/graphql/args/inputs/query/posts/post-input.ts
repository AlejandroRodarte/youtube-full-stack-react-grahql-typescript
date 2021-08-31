import { InputType, Field, Int } from 'type-graphql'

@InputType()
export default class PostInput {
  @Field(() => Int)
  id: number
}
