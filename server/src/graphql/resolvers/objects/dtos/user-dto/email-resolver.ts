import { Resolver, FieldResolver, Root, Ctx } from 'type-graphql'

import UserDto from '../../../../objects/dtos/users/user-dto'
import { GraphQLContext } from '../../../../../types/graphql'

@Resolver(UserDto)
export default class UserDtoEmailResolver {
  @FieldResolver(() => String)
  email (
    @Root() root: UserDto,
    @Ctx() { req }: GraphQLContext.ApplicationContext
  ) {
    if (req.session.userId === root.id) return root.email
    return null
  }
}
