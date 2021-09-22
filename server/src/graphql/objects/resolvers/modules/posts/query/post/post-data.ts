import { ObjectType, Field } from 'type-graphql'

import PostDto from '../../../../../dtos/posts/post-dto'

@ObjectType()
export default class PostData {
  @Field(() => PostDto)
  post: PostDto

  constructor (post: PostDto) {
    this.post = post
  }
}
