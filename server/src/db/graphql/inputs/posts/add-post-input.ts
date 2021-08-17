import { Length } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class AddPostInput {
  @Field(() => String)
  @Length(5, 50)
  title: string
}
