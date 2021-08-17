import { Length } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class RegisterUserInput {
  @Field(() => String)
  @Length(3, 50)
  username: string

  @Field(() => String)
  @Length(7, 255)
  password: string
}
