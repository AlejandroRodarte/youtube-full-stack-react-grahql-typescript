import { ObjectType, Field } from 'type-graphql'

import EditedPostDto from '../../../../../dtos/posts/edited-post-dto'

@ObjectType()
export default class EditPostData {
  @Field(() => EditedPostDto)
  updatedPost: EditedPostDto

  constructor (post: EditedPostDto) {
    this.updatedPost = post
  }
}
