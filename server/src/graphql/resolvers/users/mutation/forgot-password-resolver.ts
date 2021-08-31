import { Resolver, Arg, Ctx, Mutation, UseMiddleware } from 'type-graphql'
import { v4 } from 'uuid'

import User from '../../../../db/orm/entities/User'
import ForgotPasswordInput from '../../../args/inputs/mutation/users/forgot-password-input'
import mutationSchemas from '../../../args/schemas/mutation/users'
import usersResponses from '../../../objects/responses/users'
import responses from '../../../constants/responses'
import redisData from '../../../../redis'
import mailFunctions from '../../../../util/functions/mail'
import middlewares from '../../../middleware'
import generatedMiddlewares from '../../../../generator/graphql/middleware'
import { GraphQLContext } from '../../../../types/graphql'

@Resolver()
export default class ForgotPasswordResolver {
  @Mutation(() => usersResponses.mutation.responses.ForgotPasswordResponse)
  @UseMiddleware(
    middlewares.Anonymous,
    generatedMiddlewares.ValidateArgs(mutationSchemas.ForgotPasswordArgsSchema)
  )
  async forgotPassword (
    @Arg('data', () => ForgotPasswordInput) data: ForgotPasswordInput,
    @Ctx() { req, redis }: GraphQLContext.ApplicationContext
  ) {
    try {
      const user = await User.findOne({ where: { email: data.email } })

      if (!user) {
        return new usersResponses
          .mutation
          .responses
          .ForgotPasswordResponse(
            responses.payloads.usersPayloads.success[responses.symbols.UsersSymbols.RESET_PASSWORD_EMAIL_SENT].httpCode,
            responses.payloads.usersPayloads.success[responses.symbols.UsersSymbols.RESET_PASSWORD_EMAIL_SENT].message,
            responses.payloads.usersPayloads.success[responses.symbols.UsersSymbols.RESET_PASSWORD_EMAIL_SENT].code,
            req.body.operationName,
            new usersResponses
              .mutation
              .data
              .ForgotPasswordData(true)
          )
      }

      const token = v4()

      await redis.set(
        `${redisData.constants.prefixes.values[redisData.constants.prefixes.PrefixSymbols.FORGOT_PASSWORD_PREFIX]}${token}`,
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
        return new usersResponses
          .mutation
          .responses
          .ForgotPasswordResponse(
            responses.payloads.usersPayloads.success[responses.symbols.UsersSymbols.RESET_PASSWORD_EMAIL_SENT].httpCode,
            responses.payloads.usersPayloads.success[responses.symbols.UsersSymbols.RESET_PASSWORD_EMAIL_SENT].message,
            responses.payloads.usersPayloads.success[responses.symbols.UsersSymbols.RESET_PASSWORD_EMAIL_SENT].code,
            req.body.operationName,
            new usersResponses
              .mutation
              .data
              .ForgotPasswordData(wasEmailSent)
          )
      }

      throw new Error('Email was not sent.')
    } catch (e) {
      return new usersResponses
        .mutation
        .responses
        .ForgotPasswordResponse(
          responses.payloads.usersPayloads.error[responses.symbols.UsersSymbols.MUTATION_FORGOT_PASSWORD_ERROR].httpCode,
          responses.payloads.usersPayloads.error[responses.symbols.UsersSymbols.MUTATION_FORGOT_PASSWORD_ERROR].message,
          responses.payloads.usersPayloads.error[responses.symbols.UsersSymbols.MUTATION_FORGOT_PASSWORD_ERROR].code,
          req.body.operationName
        )
    }
  }
}
