import { Resolver, FieldResolver, Root, Ctx } from 'type-graphql'

import { GraphQLContext } from '../../../../../types/graphql'
import User from '../../../../../db/orm/entities/User'

@Resolver(User)
export default class EmailResolver {
  @FieldResolver(() => String)
  email (
    @Root() root: User,
    @Ctx() { req }: GraphQLContext.ApplicationContext
  ) {
    if (req.session.userId === root.id) return root.email
    return null
  }
}
