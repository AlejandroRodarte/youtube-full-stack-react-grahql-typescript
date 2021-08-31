import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export default class ForgotPasswordData {
  @Field(() => Boolean)
  wasEmailSent: boolean

  constructor (wasEmailSent: boolean) {
    this.wasEmailSent = wasEmailSent
  }
}
