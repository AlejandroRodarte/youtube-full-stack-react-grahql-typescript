import { MiddlewareFn } from 'type-graphql'

import User from '../../../../db/orm/entities/User'
import ApplicationResponse from '../../../../generator/graphql/objects/application-response'

import responses from '../../../../constants/graphql/responses'

import { GraphQLContext } from '../../../../types/graphql'
import { MiddlewareTypes } from '../../../../types/middlewares'

export default function Auth (
  options: MiddlewareTypes.AuthMiddlewareGeneratorOptions = {
    isApplicationResponse: true,
    checkUserOnDatabase: true
  }
) {
  const middleware: MiddlewareFn<GraphQLContext.ApplicationContext> = async (
    { context: { req }, args },
    next
  ) => {
    const ApplicationResponseClass = class extends ApplicationResponse(
      String,
      String
    ) {}

    if (req.session.userId) {
      if (options.checkUserOnDatabase) {
        try {
          const user = await User.findOne(req.session.userId)

          if (user) {
            req.user = user
            return next()
          }

          return !options.isApplicationResponse
            ? null
            : new ApplicationResponseClass(
              responses.payloads.sharedPayloads.error[responses.symbols.SharedSymbols.USER_NOT_FOUND].httpCode,
              responses.payloads.sharedPayloads.error[responses.symbols.SharedSymbols.USER_NOT_FOUND].message,
              responses.payloads.sharedPayloads.error[responses.symbols.SharedSymbols.USER_NOT_FOUND].code,
              args.namespace
            )
        } catch (e) {
          if (process.env.LOG_ERRORS === 'true') console.error(e)
          return !options.isApplicationResponse
            ? null
            : new ApplicationResponseClass(
              responses.payloads.middlewarePayloads.error[responses.symbols.MiddlewareSymbols.MIDDLEWARE_AUTH_ERROR].httpCode,
              responses.payloads.middlewarePayloads.error[responses.symbols.MiddlewareSymbols.MIDDLEWARE_AUTH_ERROR].message,
              responses.payloads.middlewarePayloads.error[responses.symbols.MiddlewareSymbols.MIDDLEWARE_AUTH_ERROR].code,
              args.namespace
            )
        }
      }
      return next()
    }

    return !options.isApplicationResponse
      ? null
      : new ApplicationResponseClass(
        responses.payloads.middlewarePayloads.error[responses.symbols.MiddlewareSymbols.UNAUTHORIZED].httpCode,
        responses.payloads.middlewarePayloads.error[responses.symbols.MiddlewareSymbols.UNAUTHORIZED].message,
        responses.payloads.middlewarePayloads.error[responses.symbols.MiddlewareSymbols.UNAUTHORIZED].code,
        args.namespace
      )
  }

  return middleware
}
