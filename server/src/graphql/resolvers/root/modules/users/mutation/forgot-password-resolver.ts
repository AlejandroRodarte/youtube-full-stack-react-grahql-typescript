import { Resolver, Arg, Ctx, Mutation, UseMiddleware } from 'type-graphql'
import { v4 } from 'uuid'

import User from '../../../../../../db/orm/entities/User'
import ForgotPasswordInput from '../../../../../args/resolvers/root/modules/users/mutation/inputs/forgot-password-input'
import ForgotPasswordArgsSchema from '../../../../../args/resolvers/root/modules/users/mutation/schemas/forgot-password-args-schema'
import objects from '../../../../../objects/resolvers/modules/users/mutation/forgot-password'
import constants from '../../../../../../constants'
import mailFunctions from '../../../../../../util/functions/mail'
import generatedMiddlewares from '../../../../../../middleware/generator/graphql/resolvers'
import { GraphQLContext } from '../../../../../../types/graphql'

@Resolver()
export default class RootForgotPasswordResolver {
  @Mutation(() => objects.ForgotPasswordResponse)
  @UseMiddleware(
    generatedMiddlewares.Anonymous({ isApplicationResponse: true }),
    generatedMiddlewares.ValidateArgs(ForgotPasswordArgsSchema)
  )
  async forgotPassword (
    @Arg('namespace', () => String) namespace: string,
    @Arg('data', () => ForgotPasswordInput) data: ForgotPasswordInput,
    @Ctx() { redis }: GraphQLContext.ApplicationContext
  ) {
    try {
      const user = await User.findOne({ where: { email: data.email } })

      if (!user) {
        return new objects
          .ForgotPasswordResponse(
            constants.graphql.responses.payloads.usersPayloads.success[constants.graphql.responses.symbols.UsersSymbols.RESET_PASSWORD_EMAIL_SENT].httpCode,
            constants.graphql.responses.payloads.usersPayloads.success[constants.graphql.responses.symbols.UsersSymbols.RESET_PASSWORD_EMAIL_SENT].message,
            constants.graphql.responses.payloads.usersPayloads.success[constants.graphql.responses.symbols.UsersSymbols.RESET_PASSWORD_EMAIL_SENT].code,
            namespace,
            new objects
              .ForgotPasswordData(true)
          )
      }

      const token = v4()

      await redis.set(
        `${constants.redis.prefixes.values[constants.redis.prefixes.PrefixSymbols.FORGOT_PASSWORD_PREFIX]}${token}`,
        user.id,
        'ex',
        1000 * 60 * 60 * 24 * parseInt(process.env.FORGOT_PASSWORD_TOKEN_EXPIRATION_DAYS || '3')
      )

      const wasEmailSent = await mailFunctions.sendHtmlMail(
        user.email,
        `[${user.username}] Reset your password`,
        `<a href=${process.env.CORS_ORIGIN}/change-password/${token}>Click here to reset your password</a>`
      )

      if (wasEmailSent) {
        return new objects
          .ForgotPasswordResponse(
            constants.graphql.responses.payloads.usersPayloads.success[constants.graphql.responses.symbols.UsersSymbols.RESET_PASSWORD_EMAIL_SENT].httpCode,
            constants.graphql.responses.payloads.usersPayloads.success[constants.graphql.responses.symbols.UsersSymbols.RESET_PASSWORD_EMAIL_SENT].message,
            constants.graphql.responses.payloads.usersPayloads.success[constants.graphql.responses.symbols.UsersSymbols.RESET_PASSWORD_EMAIL_SENT].code,
            namespace,
            new objects
              .ForgotPasswordData(wasEmailSent)
          )
      }

      throw new Error('Email was not sent.')
    } catch (e) {
      if (process.env.LOG_ERRORS === 'true') console.error(e)
      return new objects
        .ForgotPasswordResponse(
          constants.graphql.responses.payloads.usersPayloads.error[constants.graphql.responses.symbols.UsersSymbols.MUTATION_FORGOT_PASSWORD_ERROR].httpCode,
          constants.graphql.responses.payloads.usersPayloads.error[constants.graphql.responses.symbols.UsersSymbols.MUTATION_FORGOT_PASSWORD_ERROR].message,
          constants.graphql.responses.payloads.usersPayloads.error[constants.graphql.responses.symbols.UsersSymbols.MUTATION_FORGOT_PASSWORD_ERROR].code,
          namespace
        )
    }
  }
}
