import { Resolver, FieldResolver, Root, Ctx } from 'type-graphql'

import PostDto from '../../../../objects/dtos/posts/post-dto'
import UpdootDto from '../../../../objects/dtos/updoots/updoot-dto'
import { GraphQLContext } from '../../../../../types/graphql'

@Resolver(PostDto)
export default class PostDtoUpdootsResolver {
  @FieldResolver(() => [UpdootDto], { nullable: true })
  async updoots (
    @Root() root: PostDto,
    @Ctx() { dataloader }: GraphQLContext.ApplicationContext
  ) {
    try {
      const rawUpdoots = await dataloader.objects.entities.updoot.byPostId.load(root.id)
      const updootDtos = UpdootDto.fromUpdootWithAliasRawEntityArray(rawUpdoots)
      return updootDtos
    } catch (e) {
      return null
    }
  }
}
