import { Resolver, Ctx, Mutation, UseMiddleware } from 'type-graphql'

import objects from '../../../../../objects/resolvers/modules/users/mutation/logout'
import constants from '../../../../../../constants'
import middlewares from '../../../../../../middleware/graphql/resolvers/common'
import { GraphQLContext } from '../../../../../../types/graphql'

@Resolver()
export default class LogoutResolver {
  @Mutation(() => objects.LogoutResponse)
  @UseMiddleware(middlewares.Auth)
  async logout (
    @Ctx() { req, res }: GraphQLContext.ApplicationContext
  ) {
    const wasSessionDestroyed = await new Promise<boolean>((resolve) => {
      res.clearCookie(constants.ExpressSessionConstants.SESSION_COOKIE_NAME)

      req
        .session
        .destroy((error) => {
          if (error) resolve(false)
          resolve(true)
        })
    })

    if (wasSessionDestroyed) {
      return new objects
        .LogoutResponse(
          constants.graphql.responses.payloads.usersPayloads.success[constants.graphql.responses.symbols.UsersSymbols.USER_LOGGED_OUT].httpCode,
          constants.graphql.responses.payloads.usersPayloads.success[constants.graphql.responses.symbols.UsersSymbols.USER_LOGGED_OUT].message,
          constants.graphql.responses.payloads.usersPayloads.success[constants.graphql.responses.symbols.UsersSymbols.USER_LOGGED_OUT].code,
          req.body.operationName,
          new objects
            .LogoutData(wasSessionDestroyed)
        )
    }

    return new objects
      .LogoutResponse(
        constants.graphql.responses.payloads.usersPayloads.error[constants.graphql.responses.symbols.UsersSymbols.MUTATION_LOGOUT_ERROR].httpCode,
        constants.graphql.responses.payloads.usersPayloads.error[constants.graphql.responses.symbols.UsersSymbols.MUTATION_LOGOUT_ERROR].message,
        constants.graphql.responses.payloads.usersPayloads.error[constants.graphql.responses.symbols.UsersSymbols.MUTATION_LOGOUT_ERROR].code,
        req.body.operationName
      )
  }
}
