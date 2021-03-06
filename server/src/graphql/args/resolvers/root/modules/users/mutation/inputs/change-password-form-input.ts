import { InputType, Field } from 'type-graphql'

@InputType()
export default class ChangePasswordFormInput {
  @Field(() => String)
  newPassword: string
}
