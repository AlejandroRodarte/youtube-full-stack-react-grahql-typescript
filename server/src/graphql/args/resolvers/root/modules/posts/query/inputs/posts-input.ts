import { InputType, Field, Int } from 'type-graphql'
import { GraphQLResolverConstants } from 'src/types/graphql'

@InputType()
export default class PostsInput {
  @Field(() => Int)
  limit: number

  @Field(() => String)
  sort: keyof GraphQLResolverConstants.PostsSortMapper

  @Field(() => [Int], { nullable: true })
  excludeIds?: number[]

  @Field(() => String, { nullable: true })
  cursor?: string
}
