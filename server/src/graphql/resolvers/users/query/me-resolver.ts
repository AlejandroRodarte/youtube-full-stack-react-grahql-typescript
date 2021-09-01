import { Resolver, Ctx, Query, UseMiddleware } from 'type-graphql'

import usersResponses from '../../../objects/responses/users'
import responses from '../../../constants/responses'
import middlewares from '../../../middleware'
import { GraphQLContext } from '../../../../types/graphql'

@Resolver()
export default class MeResolver {
  @Query(() => usersResponses.query.responses.MeResponse)
  @UseMiddleware(middlewares.Auth)
  async me (
    @Ctx() { req }: GraphQLContext.ApplicationContext
  ) {
    const user = req.user!

    return new usersResponses
      .query
      .responses
      .MeResponse(
        responses.payloads.usersPayloads.success[responses.symbols.UsersSymbols.OWN_USER_FETCHED].httpCode,
        responses.payloads.usersPayloads.success[responses.symbols.UsersSymbols.OWN_USER_FETCHED].message,
        responses.payloads.usersPayloads.success[responses.symbols.UsersSymbols.OWN_USER_FETCHED].code,
        req.body.operationName,
        new usersResponses
          .query
          .data
          .MeData(user)
      )
  }
}
