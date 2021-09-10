import { InputType, Field } from 'type-graphql'

@InputType()
export default class RegisterInput {
  @Field(() => String)
  username: string

  @Field(() => String)
  email: string

  @Field(() => String)
  password: string
}
