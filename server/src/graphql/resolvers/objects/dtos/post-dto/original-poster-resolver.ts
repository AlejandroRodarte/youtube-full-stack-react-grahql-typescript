import { Resolver, FieldResolver, Root, Ctx } from 'type-graphql'

import PostDto from '../../../../objects/dtos/posts/post-dto'
import UserDto from '../../../../objects/dtos/users/user-dto'
import { GraphQLContext } from '../../../../../types/graphql'

@Resolver(PostDto)
export default class PostDtoOriginalPosterResolver {
  @FieldResolver(() => UserDto, { nullable: true })
  async originalPoster (
    @Root() root: PostDto,
    @Ctx() { dataloader }: GraphQLContext.ApplicationContext
  ) {
    try {
      const user = await dataloader.objects.entities.user.byId.load(root.originalPosterId)
      const userDto = UserDto.fromUserEntity(user)
      return userDto
    } catch (e) {
      return null
    }
  }
}
