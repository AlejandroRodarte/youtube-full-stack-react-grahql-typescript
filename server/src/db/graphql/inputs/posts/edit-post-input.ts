import { Length } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class EditPostInput {
  @Field(() => String, { nullable: true })
  @Length(1, 50)
  title?: string
}
