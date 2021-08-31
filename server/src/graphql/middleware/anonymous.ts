import { MiddlewareFn } from 'type-graphql'

import { GraphQLContext } from '../../types/graphql'
import ApplicationResponse from '../../generator/graphql/responses/application-response'

import * as MiddlewareSymbols from '../../graphql/constants/responses/symbols/middleware'
import middlewarePayloads from '../../graphql/constants/responses/payloads/middleware'

const Auth: MiddlewareFn<GraphQLContext.ApplicationContext> = async (
  { context: { req } },
  next
) => {
  const ApplicationResponseClass = class extends ApplicationResponse(
    String,
    String
  ) {}

  if (!req.session.userId) return next()

  return new ApplicationResponseClass(
    middlewarePayloads.error[MiddlewareSymbols.MUST_BE_ANONYMOUS].httpCode,
    middlewarePayloads.error[MiddlewareSymbols.MUST_BE_ANONYMOUS].message,
    middlewarePayloads.error[MiddlewareSymbols.MUST_BE_ANONYMOUS].code,
    req.body.operationName
  )
}

export default Auth
