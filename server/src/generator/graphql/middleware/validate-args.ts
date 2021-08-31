import { MiddlewareFn } from 'type-graphql'
import Joi from 'joi'

import ApplicationResponse from '../responses/application-response'
import FieldError from '../../../graphql/objects/responses/error/field-error'

import generateFieldErrors from '../../../util/functions/graphql/responses/generate-field-errors'

import * as MiddlewareSymbols from '../../../graphql/constants/responses/symbols/middleware'
import middlewarePayloads from '../../../graphql/constants/responses/payloads/middleware'

import { GraphQLContext } from '../../../types/graphql'

export default function ValidateArgs<T> (argsSchema: Joi.ObjectSchema<T>) {
  const middleware: MiddlewareFn<GraphQLContext.ApplicationContext> = async (
    { context: { req }, args },
    next
  ) => {
    const validationResults = argsSchema.validate(
      args,
      { abortEarly: false }
    )

    if (!validationResults.error) return next()

    const ApplicationResponseClass = class extends ApplicationResponse(
      String,
      FieldError
    ) {}

    const fieldErrors = generateFieldErrors(validationResults.error.details)

    return new ApplicationResponseClass(
      middlewarePayloads.error[MiddlewareSymbols.ARGS_VALIDATION_ERROR].httpCode,
      middlewarePayloads.error[MiddlewareSymbols.ARGS_VALIDATION_ERROR].message,
      middlewarePayloads.error[MiddlewareSymbols.ARGS_VALIDATION_ERROR].code,
      req.body.operationName,
      undefined,
      fieldErrors
    )
  }

  return middleware
}
