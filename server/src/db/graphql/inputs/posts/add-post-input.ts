import { Length } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class AddPostInput {
  @Field(() => String)
  @Length(1, 50)
  title: string
}
