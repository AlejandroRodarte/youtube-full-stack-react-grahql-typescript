import { MiddlewareFn } from 'type-graphql'

import User from '../../db/orm/entities/User'
import ApplicationResponse from '../../generator/graphql/responses/application-response'

import responses from '../../graphql/constants/responses'

import { GraphQLContext } from '../../types/graphql'

const Auth: MiddlewareFn<GraphQLContext.ApplicationContext> = async (
  { context: { req } },
  next
) => {
  const ApplicationResponseClass = class extends ApplicationResponse(
    String,
    String
  ) {}

  if (req.session.userId) {
    try {
      const user = await User.findOne(req.session.userId)

      if (user) {
        req.user = user
        return next()
      }

      return new ApplicationResponseClass(
        responses.payloads.sharedPayloads.error[responses.symbols.SharedSymbols.USER_NOT_FOUND].httpCode,
        responses.payloads.sharedPayloads.error[responses.symbols.SharedSymbols.USER_NOT_FOUND].message,
        responses.payloads.sharedPayloads.error[responses.symbols.SharedSymbols.USER_NOT_FOUND].code,
        req.body.operationName
      )
    } catch (e) {
      if (process.env.LOG_ERRORS === 'true') console.error(e)
      return new ApplicationResponseClass(
        responses.payloads.middlewarePayloads.error[responses.symbols.MiddlewareSymbols.MIDDLEWARE_AUTH_ERROR].httpCode,
        responses.payloads.middlewarePayloads.error[responses.symbols.MiddlewareSymbols.MIDDLEWARE_AUTH_ERROR].message,
        responses.payloads.middlewarePayloads.error[responses.symbols.MiddlewareSymbols.MIDDLEWARE_AUTH_ERROR].code,
        req.body.operationName
      )
    }
  }

  return new ApplicationResponseClass(
    responses.payloads.middlewarePayloads.error[responses.symbols.MiddlewareSymbols.UNAUTHORIZED].httpCode,
    responses.payloads.middlewarePayloads.error[responses.symbols.MiddlewareSymbols.UNAUTHORIZED].message,
    responses.payloads.middlewarePayloads.error[responses.symbols.MiddlewareSymbols.UNAUTHORIZED].code,
    req.body.operationName
  )
}

export default Auth
