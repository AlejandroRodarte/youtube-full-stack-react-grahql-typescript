import { InputType, Field } from 'type-graphql'

/**
 * input for login() mutation
 */
@InputType()
class LoginInput {
  @Field(() => String)
  credential: string

  @Field(() => String)
  password: string
}

/**
 * input for register() mutation
 */
@InputType()
class RegisterInput {
  @Field(() => String)
  username: string

  @Field(() => String)
  email: string

  @Field(() => String)
  password: string
}

/**
 * input for forgotPassword() mutation
 */
@InputType()
class ForgotPasswordInput {
  @Field(() => String)
  email: string
}

export {
  LoginInput,
  RegisterInput,
  ForgotPasswordInput
}
