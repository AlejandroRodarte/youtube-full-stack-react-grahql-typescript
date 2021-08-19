import { InputType, Field } from 'type-graphql'

@InputType()
class AddPostInput {
  @Field(() => String)
  title: string
}

@InputType()
class EditPostInput {
  @Field(
    () => String,
    { nullable: true }
  )
  title?: string
}

export {
  AddPostInput,
  EditPostInput
}
