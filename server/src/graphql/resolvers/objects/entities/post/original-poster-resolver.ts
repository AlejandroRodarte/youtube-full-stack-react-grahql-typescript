import { Resolver, FieldResolver, Root, Ctx } from 'type-graphql'

import User from '../../../../../db/orm/entities/User'
import Post from '../../../../../db/orm/entities/Post'
import { GraphQLContext } from '../../../../../types/graphql'

@Resolver(Post)
export default class OriginalPosterResolver {
  @FieldResolver(() => User, { nullable: true })
  async originalPoster (
    @Root() root: Post,
    @Ctx() { dataloader }: GraphQLContext.ApplicationContext
  ) {
    try {
      const user = await dataloader.objects.user.load(root.originalPosterId)
      return user
    } catch (e) {
      return null
    }
  }
}
