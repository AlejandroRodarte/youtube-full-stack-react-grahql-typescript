import { ObjectType, Field } from 'type-graphql'

import PostDto from '../../../../../dtos/posts/post-dto'

@ObjectType()
export default class PostsData {
  @Field(() => [PostDto])
  posts: PostDto[]

  @Field(() => Boolean)
  hasMore: boolean

  constructor (
    posts: PostDto[],
    hasMore: boolean
  ) {
    this.posts = posts
    this.hasMore = hasMore
  }
}
