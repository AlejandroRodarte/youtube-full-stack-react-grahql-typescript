import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, Unique, OneToMany } from 'typeorm'
import { Field, ObjectType } from 'type-graphql'

import Post from './Post'

@ObjectType()
@Entity()
@Unique('user_username_unique', ['username'])
@Unique('user_email_unique', ['email'])
export default class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  // set this field unique on the database
  @Field()
  @Column()
  username!: string

  @Field({ nullable: true })
  @Column()
  email!: string

  // note how we do not use @Field here
  // we do not want to expose the password on our GraphQL definition
  @Column()
  password!: string

  @OneToMany(
    () => Post,
    post => post.originalPoster
  )
  posts: Post[]

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date
}
