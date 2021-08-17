import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class FieldError {
  @Field(() => String)
  field!: string

  @Field(() => [String])
  messages!: string[]

  constructor (field: string, messages: string[]) {
    this.field = field
    this.messages = messages
  }
}
