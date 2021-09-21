import { Resolver, Ctx, Arg, Mutation, UseMiddleware } from 'type-graphql'

import LogoutArgsSchema from '../../../../../args/resolvers/root/modules/users/mutation/schemas/logout-args-schema'
import objects from '../../../../../objects/resolvers/modules/users/mutation/logout'
import constants from '../../../../../../constants'
import generatedMiddlewares from '../../../../../../middleware/generator/graphql/resolvers'
import { GraphQLContext } from '../../../../../../types/graphql'

@Resolver()
export default class RootLogoutResolver {
  @Mutation(() => objects.LogoutResponse)
  @UseMiddleware(
    generatedMiddlewares.Auth({ isApplicationResponse: true, checkUserOnDatabase: true }),
    generatedMiddlewares.ValidateArgs(LogoutArgsSchema)
  )
  async logout (
    @Arg('namespace', () => String) namespace: string,
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
          namespace,
          new objects
            .LogoutData(wasSessionDestroyed)
        )
    }

    return new objects
      .LogoutResponse(
        constants.graphql.responses.payloads.usersPayloads.error[constants.graphql.responses.symbols.UsersSymbols.MUTATION_LOGOUT_ERROR].httpCode,
        constants.graphql.responses.payloads.usersPayloads.error[constants.graphql.responses.symbols.UsersSymbols.MUTATION_LOGOUT_ERROR].message,
        constants.graphql.responses.payloads.usersPayloads.error[constants.graphql.responses.symbols.UsersSymbols.MUTATION_LOGOUT_ERROR].code,
        namespace
      )
  }
}
