import { InputType, Field } from 'type-graphql'

import ChangePasswordFormInput from './change-password-form-input'

@InputType()
export default class ChangePasswordInput {
  @Field(() => String)
  token: string

  @Field(() => ChangePasswordFormInput)
  form: ChangePasswordFormInput
}
