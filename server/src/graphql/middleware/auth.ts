import { MiddlewareFn } from 'type-graphql'

import { ApplicationContext } from '../../types/graphql'
import ApplicationResponse from '../../generator/graphql/responses/application-response'
import * as MiddlewareSymbols from '../../graphql/constants/responses/symbols/middleware'
import middlewarePayloads from '../../graphql/constants/responses/payloads/middleware'

const Auth: MiddlewareFn<ApplicationContext> = async (
  { context: { req } },
  next
) => {
  const ApplicationResponseClass = class extends ApplicationResponse(
    String,
    String
  ) {}

  if (req.session.userId) return next()

  return new ApplicationResponseClass(
    middlewarePayloads.error[MiddlewareSymbols.UNAUTHORIZED].httpCode,
    middlewarePayloads.error[MiddlewareSymbols.UNAUTHORIZED].code,
    middlewarePayloads.error[MiddlewareSymbols.UNAUTHORIZED].message
  )
}

export default Auth
