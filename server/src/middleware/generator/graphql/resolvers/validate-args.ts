import { MiddlewareFn } from 'type-graphql'
import Joi from 'joi'

import ApplicationResponse from '../../../../generator/graphql/objects/application-response'
import FieldError from '../../../../graphql/objects/common/error/field-error'

import generateFieldErrors from '../../../../util/functions/middleware/generate-field-errors'

import * as MiddlewareSymbols from '../../../../constants/graphql/responses/symbols/middleware'
import middlewarePayloads from '../../../../constants/graphql/responses/payloads/middleware'

import { GraphQLContext } from '../../../../types/graphql'

export default function ValidateArgs<T> (argsSchema: Joi.ObjectSchema<T>) {
  const middleware: MiddlewareFn<GraphQLContext.ApplicationContext> = async (
    { args },
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
      args.namespace,
      undefined,
      fieldErrors
    )
  }

  return middleware
}
