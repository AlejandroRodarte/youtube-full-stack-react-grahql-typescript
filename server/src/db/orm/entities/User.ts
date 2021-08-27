import { Entity, PrimaryKey, Property } from '@mikro-orm/core'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryKey()
  id!: number

  @Field(() => String)
  @Property({ type: 'date' })
  createdAt = new Date()

  @Field(() => String)
  @Property({
    type: 'date',
    onUpdate: () => new Date()
  })
  updatedAt = new Date()

  // set this field unique on the database
  @Field()
  @Property({
    type: 'text',
    unique: true
  })
  username!: string

  @Field()
  @Property({
    type: 'text',
    unique: true
  })
  email!: string

  // note how we do not use @Field here
  // we do not want to expose the password on our GraphQL definition
  @Property({ type: 'text' })
  password!: string
}
