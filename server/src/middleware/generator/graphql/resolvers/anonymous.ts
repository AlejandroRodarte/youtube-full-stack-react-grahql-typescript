import { MiddlewareFn } from 'type-graphql'

import ApplicationResponse from '../../../../generator/graphql/objects/application-response'

import * as MiddlewareSymbols from '../../../../constants/graphql/responses/symbols/middleware'
import middlewarePayloads from '../../../../constants/graphql/responses/payloads/middleware'

import { GraphQLContext } from '../../../../types/graphql'
import { MiddlewareTypes } from '../../../../types/middlewares'

export default function Anonymous (options: MiddlewareTypes.AnonymousMiddlewareGeneratorOptions = { isApplicationResponse: true }) {
  const middleware: MiddlewareFn<GraphQLContext.ApplicationContext> = async (
    { context: { req }, args },
    next
  ) => {
    const ApplicationResponseClass = class extends ApplicationResponse(
      String,
      String
    ) {}

    if (!req.session.userId) return next()

    return !options.isApplicationResponse
      ? null
      : new ApplicationResponseClass(
        middlewarePayloads.error[MiddlewareSymbols.MUST_BE_ANONYMOUS].httpCode,
        middlewarePayloads.error[MiddlewareSymbols.MUST_BE_ANONYMOUS].message,
        middlewarePayloads.error[MiddlewareSymbols.MUST_BE_ANONYMOUS].code,
        args.namespace
      )
  }

  return middleware
}
