import { Resolver, FieldResolver, Root, Int, Ctx, Arg, UseMiddleware } from 'type-graphql'

import Post from '../../../../../db/orm/entities/Post'
import TrendingScoreInput from '../../../../args/objects/entities/post/inputs/trending-score-input'
import TrendingScoreArgs from '../../../../args/objects/entities/post/schemas/trending-score-args'
import generatedMiddlewares from '../../../../../middleware/generator/graphql/resolvers'
import { GraphQLContext } from '../../../../../types/graphql'

@Resolver(Post)
export default class TrendingScoreResolver {
  @FieldResolver(() => Int)
  @UseMiddleware(generatedMiddlewares.ValidateArgs(TrendingScoreArgs))
  async trendingScore (
    @Root() root: Post,
    @Arg('data', () => TrendingScoreInput) data: TrendingScoreInput,
    @Ctx() { dataloader }: GraphQLContext.ApplicationContext
  ) {
    try {
      const score =
        await dataloader
          .computed
          .posts
          .trendingScore
          .load({
            postId: root.id,
            timestamp: data.timestamp
          })

      return score.trendingScore
    } catch (e) {
      return null
    }
  }
}
