
import { Field, ObjectType } from 'type-graphql'
import { Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, Column, BaseEntity } from 'typeorm'

// @ObjectType to make this available to our GraphQL schema
@ObjectType()
@Entity()
export class Post extends BaseEntity {
  // @Field to expose this field to the GraphQL schema
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date

  @Field()
  @Column()
  title!: string
}
