
import { Field, ObjectType } from 'type-graphql'
import { Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, Column, BaseEntity, ManyToOne } from 'typeorm'

import User from './User'

// @ObjectType to make this available to our GraphQL schema
@ObjectType()
@Entity()
export default class Post extends BaseEntity {
  // @Field to expose this field to the GraphQL schema
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column()
  title!: string

  @Field()
  @Column()
  text!: string

  @Field()
  @Column({
    type: 'int',
    default: 0
  })
  points!: number

  @Field()
  @Column()
  originalPosterId: number

  @Field()
  @ManyToOne(
    () => User,
    user => user.posts
  )
  originalPoster: User

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date
}
