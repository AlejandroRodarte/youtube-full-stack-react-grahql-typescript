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

/**
 * input for changePassword() mutation
 */
@InputType()
class ChangePasswordFormInput {
  @Field(() => String)
  newPassword: string
}

@InputType()
class ChangePasswordInput {
  @Field(() => String)
  token: string

  @Field(() => ChangePasswordFormInput)
  form: ChangePasswordFormInput
}

export {
  LoginInput,
  RegisterInput,
  ForgotPasswordInput,
  ChangePasswordInput
}
