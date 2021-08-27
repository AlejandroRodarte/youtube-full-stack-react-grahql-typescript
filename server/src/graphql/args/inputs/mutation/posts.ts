import { InputType, Field, Int } from 'type-graphql'

/**
 * input for addPost() mutation
 */

@InputType()
class AddPostInput {
  @Field(() => String)
  title: string
}

/**
 * input for editPost() mutation
 */

@InputType()
class OptionalPostFieldsInput {
  @Field(
    () => String,
    { nullable: true }
  )
  title?: string
}

@InputType()
class EditPostInput {
  @Field(() => Int)
  id: number

  @Field(() => OptionalPostFieldsInput)
  fields: OptionalPostFieldsInput
}

/**
 * input for deletePost() mutation
 */
@InputType()
class DeletePostInput {
  @Field(() => Int)
  id: number
}

export {
  AddPostInput,
  EditPostInput,
  DeletePostInput
}
