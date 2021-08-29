import { MiddlewareFn } from 'type-graphql'

import { ApplicationContext } from '../../types/graphql'
import ApplicationResponse from '../../generator/graphql/responses/application-response'
import * as MiddlewareSymbols from '../../graphql/constants/responses/symbols/middleware'
import middlewarePayloads from '../../graphql/constants/responses/payloads/middleware'
import * as SharedSymbols from '../../graphql/constants/responses/symbols/shared'
import sharedPayloads from '../../graphql/constants/responses/payloads/shared'
import { User } from '../../db/orm/entities/User'

const Auth: MiddlewareFn<ApplicationContext> = async (
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
        sharedPayloads.error[SharedSymbols.USER_NOT_FOUND].httpCode,
        sharedPayloads.error[SharedSymbols.USER_NOT_FOUND].message,
        sharedPayloads.error[SharedSymbols.USER_NOT_FOUND].code,
        req.body.operationName
      )
    } catch (e) {
      return new ApplicationResponseClass(
        middlewarePayloads.error[MiddlewareSymbols.MIDDLEWARE_AUTH_ERROR].httpCode,
        middlewarePayloads.error[MiddlewareSymbols.MIDDLEWARE_AUTH_ERROR].message,
        middlewarePayloads.error[MiddlewareSymbols.MIDDLEWARE_AUTH_ERROR].code,
        req.body.operationName
      )
    }
  }

  return new ApplicationResponseClass(
    middlewarePayloads.error[MiddlewareSymbols.UNAUTHORIZED].httpCode,
    middlewarePayloads.error[MiddlewareSymbols.UNAUTHORIZED].message,
    middlewarePayloads.error[MiddlewareSymbols.UNAUTHORIZED].code,
    req.body.operationName
  )
}

export default Auth
