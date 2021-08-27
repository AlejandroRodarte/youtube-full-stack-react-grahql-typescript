import { InputType, Field, Int } from 'type-graphql'

/**
 * input for post() mutation
 */
@InputType()
class PostInput {
  @Field(() => Int)
  id: number
}

export {
  PostInput
}
