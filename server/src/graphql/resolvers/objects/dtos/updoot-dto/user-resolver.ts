import { Resolver, FieldResolver, Root, Ctx } from 'type-graphql'

import UpdootDto from '../../../../objects/dtos/updoots/updoot-dto'
import UserDto from '../../../../objects/dtos/users/user-dto'
import { GraphQLContext } from '../../../../../types/graphql'

@Resolver(UpdootDto)
export default class UpdootDtoUserResolver {
  @FieldResolver(() => UserDto, { nullable: true })
  async user (
    @Root() root: UpdootDto,
    @Ctx() { dataloader }: GraphQLContext.ApplicationContext
  ) {
    try {
      const user = await dataloader.objects.entities.user.byId.load(root.userId)
      const userDto = UserDto.fromUserEntity(user)
      return userDto
    } catch (e) {
      return null
    }
  }
}
