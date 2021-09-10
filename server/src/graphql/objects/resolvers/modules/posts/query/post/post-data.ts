import { ObjectType, Field } from 'type-graphql'

import Post from '../../../../../../../db/orm/entities/Post'

@ObjectType()
export default class PostData {
  @Field(() => Post)
  post: Post

  constructor (post: Post) {
    this.post = post
  }
}
