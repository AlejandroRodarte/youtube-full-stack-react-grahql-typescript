import { Field, ObjectType, Int } from 'type-graphql'

import { DBRawEntities } from '../../../../types/db'

@ObjectType()
export default class EditedPostDto {
  @Field(() => Int)
  id: number

  @Field(() => String)
  title: string

  @Field(() => String)
  text: string

  constructor (
    id: number,
    title: string,
    text: string
  ) {
    this.id = id
    this.title = title
    this.text = text
  }

  static fromPostRawEntity (post: DBRawEntities.PostRawEntity) {
    return new EditedPostDto(
      post.id,
      post.title,
      post.text
    )
  }
}
