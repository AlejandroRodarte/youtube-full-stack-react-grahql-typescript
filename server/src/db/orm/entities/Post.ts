import { Entity, PrimaryKey, Property } from '@mikro-orm/core'
import { Field, ObjectType } from 'type-graphql'

// @ObjectType to make this available to our GraphQL schema
@ObjectType()
@Entity()
export class Post {
  // @Field to expose this field to the GraphQL schema
  @Field()
  @PrimaryKey()
  id!: number

  @Field(() => String)
  @Property({ type: 'date' })
  createdAt = new Date()

  @Field(() => String)
  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date()

  @Field()
  @Property({ type: 'text' })
  title!: string
}
