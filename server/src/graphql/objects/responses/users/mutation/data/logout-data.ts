import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export default class LogoutData {
  @Field(() => Boolean)
  wasSessionDestroyed: boolean

  constructor (wasSessionDestroyed: boolean) {
    this.wasSessionDestroyed = wasSessionDestroyed
  }
}
