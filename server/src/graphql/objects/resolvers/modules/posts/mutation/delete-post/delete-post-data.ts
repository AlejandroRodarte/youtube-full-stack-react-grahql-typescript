import { ObjectType, Field, Int } from 'type-graphql'

@ObjectType()
export default class DeletePostData {
  @Field(() => Int)
  id: number

  constructor (id: number) {
    this.id = id
  }
}
