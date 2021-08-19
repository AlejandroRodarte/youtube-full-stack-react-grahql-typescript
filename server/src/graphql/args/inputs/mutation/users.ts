import { InputType, Field } from 'type-graphql'

@InputType()
class RegisterUserInput {
  @Field(() => String)
  username: string

  @Field(() => String)
  password: string
}

@InputType()
class LoginUserInput extends RegisterUserInput {}

export { RegisterUserInput, LoginUserInput }
