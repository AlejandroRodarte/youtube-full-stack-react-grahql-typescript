import { InputType, Field, Int } from 'type-graphql'

import OptionalPostFieldsInput from './optional-post-fields-input'

@InputType()
export default class EditPostInput {
  @Field(() => Int)
  id: number

  @Field(() => OptionalPostFieldsInput)
  fields: OptionalPostFieldsInput
}
