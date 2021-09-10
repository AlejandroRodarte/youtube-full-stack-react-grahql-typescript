
import { ObjectType, Field } from 'type-graphql'

import Post from '../../../../../../../db/orm/entities/Post'

@ObjectType()
export default class AddPostData {
  @Field(() => Post)
  newPost: Post

  constructor (post: Post) {
    this.newPost = post
  }
}
