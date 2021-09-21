import { Resolver, FieldResolver, Root, Ctx } from 'type-graphql'

import UserDto from '../../../../objects/dtos/users/user-dto'
import UpdootDto from '../../../../objects/dtos/updoots/updoot-dto'
import { GraphQLContext } from '../../../../../types/graphql'

@Resolver(UserDto)
export default class UserDtoUpdootsResolver {
  @FieldResolver(() => [UpdootDto], { nullable: true })
  async updoots (
    @Root() root: UserDto,
    @Ctx() { dataloader }: GraphQLContext.ApplicationContext
  ) {
    try {
      const rawUpdoots = await dataloader.objects.entities.updoot.byUserId.load(root.id)
      const updootDtos = UpdootDto.fromUpdootWithAliasRawEntityArray(rawUpdoots)
      return updootDtos
    } catch (e) {
      return null
    }
  }
}
