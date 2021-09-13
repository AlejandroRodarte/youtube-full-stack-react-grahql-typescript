import { MiddlewareFn } from 'type-graphql'

import ApplicationResponse from '../../../../generator/graphql/objects/application-response'

import * as MiddlewareSymbols from '../../../../constants/graphql/responses/symbols/middleware'
import middlewarePayloads from '../../../../constants/graphql/responses/payloads/middleware'

import { GraphQLContext } from '../../../../types/graphql'

const Auth: MiddlewareFn<GraphQLContext.ApplicationContext> = async (
  { context: { req }, args },
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
    args.namespace
  )
}

export default Auth
