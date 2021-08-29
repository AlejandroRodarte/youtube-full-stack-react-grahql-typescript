import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, Unique } from 'typeorm'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
@Entity()
@Unique('user_username_unique', ['username'])
@Unique('user_email_unique', ['email'])
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date

  // set this field unique on the database
  @Field()
  @Column()
  username!: string

  @Field()
  @Column()
  email!: string

  // note how we do not use @Field here
  // we do not want to expose the password on our GraphQL definition
  @Column()
  password!: string
}
