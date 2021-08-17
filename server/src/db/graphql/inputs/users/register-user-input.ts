import { Length } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class RegisterUserInput {
  @Field(() => String)
  @Length(5, 50)
  username: string

  @Field(() => String)
  password: string
}
