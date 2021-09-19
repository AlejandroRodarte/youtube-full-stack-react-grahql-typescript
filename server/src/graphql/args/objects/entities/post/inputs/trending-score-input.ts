import { Field, InputType } from 'type-graphql'

@InputType()
export default class TrendingScoreInput {
  @Field(() => String)
  timestamp: string
}
