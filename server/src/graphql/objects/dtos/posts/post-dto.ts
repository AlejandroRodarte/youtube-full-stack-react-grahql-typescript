import { Field, ObjectType, Int } from 'type-graphql'

import Post from './../../../../db/orm/entities/Post'
import { DBRawEntities } from '../../../../types/db'

@ObjectType()
export default class PostDto {
  @Field(() => Int)
  id: number

  @Field(() => String)
  title: string

  @Field(() => String)
  text: string

  @Field(() => Int)
  points: number

  @Field(() => Int)
  originalPosterId: number

  @Field(() => Int)
  trendingScore: number

  @Field(() => String)
  createdAt: Date

  @Field(() => String)
  updatedAt: Date

  constructor (
    id: number,
    title: string,
    text: string,
    points: number,
    originalPosterId: number,
    trendingScore: number,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id
    this.title = title
    this.text = text
    this.points = points
    this.originalPosterId = originalPosterId
    this.trendingScore = trendingScore
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  static fromPostEntity (post: Post) {
    return new PostDto(
      post.id,
      post.title,
      post.text,
      post.points,
      post.originalPosterId,
      0,
      post.createdAt,
      post.updatedAt
    )
  }

  static fromPostWithTrendingScoreRawEntity (post: DBRawEntities.PostWithTrendingScoreRawEntity) {
    return new PostDto(
      post.id,
      post.title,
      post.text,
      post.points,
      post.originalPosterId,
      +post.trendingscore,
      post.createdAt,
      post.updatedAt
    )
  }

  static fromPostWithTrendingScoreRawEntityArray (posts: DBRawEntities.PostWithTrendingScoreRawEntity[]) {
    return posts.map((post) => new PostDto(
      post.id,
      post.title,
      post.text,
      post.points,
      post.originalPosterId,
      +post.trendingscore,
      post.createdAt,
      post.updatedAt
    ))
  }
}
