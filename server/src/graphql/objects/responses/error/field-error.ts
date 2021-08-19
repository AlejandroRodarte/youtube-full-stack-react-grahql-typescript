import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class FieldError {
  @Field(() => String)
  path: string

  @Field(() => String)
  type: string

  @Field(() => String)
  label: string

  @Field(() => String)
  message: string

  constructor (path: string, type: string, label: string, message: string) {
    this.path = path
    this.type = type
    this.label = label
    this.message = message
  }
}
