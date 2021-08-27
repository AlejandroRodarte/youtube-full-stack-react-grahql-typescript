import { InputType, Field } from 'type-graphql'

@InputType()
class LoginUserInput {
  @Field(() => String)
  username: string

  @Field(() => String)
  password: string
}
@InputType()
class RegisterUserInput extends LoginUserInput {
  @Field(() => String)
  email: string
}

export {
  LoginUserInput,
  RegisterUserInput
}
