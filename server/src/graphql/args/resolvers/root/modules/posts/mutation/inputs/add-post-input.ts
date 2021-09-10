import { Field, InputType } from 'type-graphql'

@InputType()
export default class AddPostInput {
  @Field(() => String)
  title: string

  @Field(() => String)
  text: string
}
