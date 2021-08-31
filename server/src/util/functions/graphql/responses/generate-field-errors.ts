import Joi from 'joi'

import FieldError from '../../../../graphql/objects/responses/error/field-error'

export default function generateFieldErrors (details: Joi.ValidationErrorItem[]) {
  return details.map((error) => {
    const dotPath = error.path.join('.')

    const label =
      (error.context && error.context.label) ? error.context.label : dotPath

    const message =
      error.type !== 'alternatives.match'
        ? error.message
        : (
            error.context
              ? error.context.details.map((detail: any) => detail.message).join(' ') as string
              : 'Wrong input'
          )

    return new FieldError(
      dotPath,
      error.type,
      label,
      message
    )
  })
}
