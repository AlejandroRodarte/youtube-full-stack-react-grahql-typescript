import { Resolver, Ctx, Mutation, Query, UseMiddleware } from 'type-graphql'

import usersResponses from '../../../objects/responses/users'
import responses from '../../../constants/responses'
import redisData from '../../../../redis'
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

  @Mutation(() => usersResponses.mutation.responses.LogoutResponse)
  @UseMiddleware(middlewares.Auth)
  async logout (
    @Ctx() { req, res }: GraphQLContext.ApplicationContext
  ) {
    const wasSessionDestroyed = await new Promise<boolean>((resolve) => {
      res.clearCookie(redisData.constants.SessionConstants.SESSION_COOKIE_NAME)

      req
        .session
        .destroy((error) => {
          if (error) resolve(false)
          resolve(true)
        })
    })

    if (wasSessionDestroyed) {
      return new usersResponses
        .mutation
        .responses
        .LogoutResponse(
          responses.payloads.usersPayloads.success[responses.symbols.UsersSymbols.USER_LOGGED_OUT].httpCode,
          responses.payloads.usersPayloads.success[responses.symbols.UsersSymbols.USER_LOGGED_OUT].message,
          responses.payloads.usersPayloads.success[responses.symbols.UsersSymbols.USER_LOGGED_OUT].code,
          req.body.operationName,
          new usersResponses
            .mutation
            .data
            .LogoutData(wasSessionDestroyed)
        )
    }

    return new usersResponses
      .mutation
      .responses
      .LogoutResponse(
        responses.payloads.usersPayloads.error[responses.symbols.UsersSymbols.MUTATION_LOGOUT_ERROR].httpCode,
        responses.payloads.usersPayloads.error[responses.symbols.UsersSymbols.MUTATION_LOGOUT_ERROR].message,
        responses.payloads.usersPayloads.error[responses.symbols.UsersSymbols.MUTATION_LOGOUT_ERROR].code,
        req.body.operationName
      )
  }
}
