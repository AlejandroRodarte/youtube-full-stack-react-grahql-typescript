import { ObjectType, Field } from 'type-graphql'

import Post from '../../../../../../db/orm/entities/Post'

@ObjectType()
export default class PostsData {
  @Field(() => [Post])
  posts: Post[]

  constructor (posts: Post[]) {
    this.posts = posts
  }
}
