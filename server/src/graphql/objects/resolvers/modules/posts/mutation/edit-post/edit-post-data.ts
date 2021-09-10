import { ObjectType, Field } from 'type-graphql'

import Post from '../../../../../../../db/orm/entities/Post'

@ObjectType()
export default class EditPostData {
  @Field(() => Post)
  updatedPost: Post

  constructor (post: Post) {
    this.updatedPost = post
  }
}
