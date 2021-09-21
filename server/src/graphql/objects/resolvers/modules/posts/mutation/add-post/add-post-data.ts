
import { ObjectType, Field } from 'type-graphql'

import PostDto from '../../../../../dtos/posts/post-dto'

@ObjectType()
export default class AddPostData {
  @Field(() => PostDto)
  newPost: PostDto

  constructor (post: PostDto) {
    this.newPost = post
  }
}
