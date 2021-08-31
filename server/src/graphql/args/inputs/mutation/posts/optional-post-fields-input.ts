import { InputType, Field } from 'type-graphql'

@InputType()
export default class OptionalPostFieldsInput {
  @Field(
    () => String,
    { nullable: true }
  )
  title?: string

  @Field(
    () => String,
    { nullable: true }
  )
  text?: string
}
