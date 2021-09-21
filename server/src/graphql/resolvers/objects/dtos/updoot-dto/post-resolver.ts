import { Resolver, FieldResolver, Root, Ctx } from 'type-graphql'

import UpdootDto from '../../../../objects/dtos/updoots/updoot-dto'
import PostDto from '../../../../objects/dtos/posts/post-dto'
import { GraphQLContext } from '../../../../../types/graphql'

@Resolver(UpdootDto)
export default class UpdootDtoPostResolver {
  @FieldResolver(() => PostDto, { nullable: true })
  async post (
    @Root() root: UpdootDto,
    @Ctx() { dataloader }: GraphQLContext.ApplicationContext
  ) {
    try {
      const rawPost = await dataloader.objects.entities.post.withTrendingScore.byId.load(root.postId)
      const postDto = PostDto.fromPostWithTrendingScoreRawEntity(rawPost)
      return postDto
    } catch (e) {
      return null
    }
  }
}
