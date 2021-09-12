import { ObjectType, Field } from 'type-graphql'

import Post from '../../../../../../../db/orm/entities/Post'

@ObjectType()
export default class PostsData {
  @Field(() => [Post])
  posts: Post[]

  @Field(() => Boolean)
  hasMore: boolean

  constructor (
    posts: Post[],
    hasMore: boolean
  ) {
    this.posts = posts
    this.hasMore = hasMore
  }
}
