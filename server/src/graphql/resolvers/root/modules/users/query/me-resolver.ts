import { Resolver, Ctx, Query, UseMiddleware } from 'type-graphql'

import objects from '../../../../../objects/resolvers/modules/users/query/me'
import responses from '../../../../../../constants/graphql/responses'
import middlewares from '../../../../../../middleware/graphql/resolvers/common'
import { GraphQLContext } from '../../../../../../types/graphql'

@Resolver()
export default class MeResolver {
  @Query(() => objects.MeResponse)
  @UseMiddleware(middlewares.Auth)
  async me (
    @Ctx() { req }: GraphQLContext.ApplicationContext
  ) {
    const user = req.user!

    return new objects
      .MeResponse(
        responses.payloads.usersPayloads.success[responses.symbols.UsersSymbols.OWN_USER_FETCHED].httpCode,
        responses.payloads.usersPayloads.success[responses.symbols.UsersSymbols.OWN_USER_FETCHED].message,
        responses.payloads.usersPayloads.success[responses.symbols.UsersSymbols.OWN_USER_FETCHED].code,
        req.body.operationName,
        new objects
          .MeData(user)
      )
  }
}
