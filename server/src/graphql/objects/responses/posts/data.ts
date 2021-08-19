import { ObjectType, Field, Int } from 'type-graphql'

import { Post } from '../../../../db/orm/entities/post'

@ObjectType()
export class GetPostsData {
  @Field(() => [Post])
  posts: Post[]

  constructor (posts: Post[]) {
    this.posts = posts
  }
}

@ObjectType()
export class GetPostData {
  @Field(() => Post)
  post: Post

  constructor (post: Post) {
    this.post = post
  }
}

@ObjectType()
export class AddPostData {
  @Field(() => Post)
  newPost: Post

  constructor (post: Post) {
    this.newPost = post
  }
}

@ObjectType()
export class EditPostData {
  @Field(() => Post)
  updatedPost: Post

  constructor (post: Post) {
    this.updatedPost = post
  }
}

@ObjectType()
export class DeletePostData {
  @Field(() => Int)
  id: number

  constructor (id: number) {
    this.id = id
  }
}
