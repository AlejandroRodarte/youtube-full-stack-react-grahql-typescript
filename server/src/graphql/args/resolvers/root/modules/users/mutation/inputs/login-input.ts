import { InputType, Field } from 'type-graphql'

@InputType()
export default class LoginInput {
  @Field(() => String)
  credential: string

  @Field(() => String)
  password: string
}
