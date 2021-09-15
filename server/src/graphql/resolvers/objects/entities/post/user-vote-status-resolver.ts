import { Resolver, FieldResolver, Root, Int, UseMiddleware, Ctx } from 'type-graphql'

import Updoot from './../../../../../db/orm/entities/Updoot'
import Post from '../../../../../db/orm/entities/Post'
import generatedMiddlewares from '../../../../../middleware/generator/graphql/resolvers'
import { GraphQLContext } from '../../../../../types/graphql'

@Resolver(Post)
export default class UserVoteStatusResolver {
  @FieldResolver(() => Int, { nullable: true })
  @UseMiddleware(generatedMiddlewares.Auth({ isApplicationResponse: false, checkUserOnDatabase: false }))
  async userVoteStatus (
    @Root() root: Post,
    @Ctx() { req }: GraphQLContext.ApplicationContext
  ) {
    try {
      const updoot = await Updoot.findOne({
        where: {
          userId: req.session.userId!,
          postId: root.id
        }
      })

      if (updoot) return updoot.value
      return 0
    } catch (e) {
      return null
    }
  }
}
