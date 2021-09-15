import { Resolver, Ctx, Arg, Query, UseMiddleware } from 'type-graphql'

import MeArgsSchema from '../../../../../args/resolvers/root/modules/users/query/schemas/me-args-schema'
import objects from '../../../../../objects/resolvers/modules/users/query/me'
import responses from '../../../../../../constants/graphql/responses'
import generatedMiddlewares from '../../../../../../middleware/generator/graphql/resolvers'
import { GraphQLContext } from '../../../../../../types/graphql'

@Resolver()
export default class MeResolver {
  @Query(() => objects.MeResponse)
  @UseMiddleware(
    generatedMiddlewares.Auth({ isApplicationResponse: true, checkUserOnDatabase: true }),
    generatedMiddlewares.ValidateArgs(MeArgsSchema)
  )
  async me (
    @Arg('namespace', () => String) namespace: string,
    @Ctx() { req }: GraphQLContext.ApplicationContext
  ) {
    const user = req.user!

    return new objects
      .MeResponse(
        responses.payloads.usersPayloads.success[responses.symbols.UsersSymbols.OWN_USER_FETCHED].httpCode,
        responses.payloads.usersPayloads.success[responses.symbols.UsersSymbols.OWN_USER_FETCHED].message,
        responses.payloads.usersPayloads.success[responses.symbols.UsersSymbols.OWN_USER_FETCHED].code,
        namespace,
        new objects
          .MeData(user)
      )
  }
}
