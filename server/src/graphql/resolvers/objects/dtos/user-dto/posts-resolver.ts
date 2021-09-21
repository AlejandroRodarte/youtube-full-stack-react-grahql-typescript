import { Resolver, FieldResolver, Root, Ctx } from 'type-graphql'

import UserDto from '../../../../objects/dtos/users/user-dto'
import PostDto from '../../../../objects/dtos/posts/post-dto'
import { GraphQLContext } from '../../../../../types/graphql'

@Resolver(UserDto)
export default class UserDtoPostsResolver {
  @FieldResolver(() => [PostDto], { nullable: true })
  async posts (
    @Root() root: UserDto,
    @Ctx() { dataloader }: GraphQLContext.ApplicationContext
  ) {
    try {
      const rawPosts = await dataloader.objects.entities.post.withTrendingScore.byOriginalPosterId.load(root.id)
      const postDtos = PostDto.fromPostWithTrendingScoreRawEntityArray(rawPosts)
      return postDtos
    } catch (e) {
      return null
    }
  }
}
