import { Resolver, FieldResolver, Root, Int, UseMiddleware, Ctx } from 'type-graphql'

import PostDto from '../../../../objects/dtos/posts/post-dto'
import generatedMiddlewares from '../../../../../middleware/generator/graphql/resolvers'
import { GraphQLContext } from '../../../../../types/graphql'

@Resolver(PostDto)
export default class PostDtoUserVoteStatusResolver {
  @FieldResolver(() => Int, { nullable: true })
  @UseMiddleware(generatedMiddlewares.Auth({ isApplicationResponse: false, checkUserOnDatabase: false }))
  async userVoteStatus (
    @Root() root: PostDto,
    @Ctx() { req, dataloader }: GraphQLContext.ApplicationContext
  ) {
    try {
      const updoot = await dataloader.objects.entities.updoot.byPrimaryKey.load({
        userId: req.session.userId!,
        postId: root.id
      })

      if (updoot) return updoot.value
      return 0
    } catch (e) {
      return null
    }
  }
}
