import Joi from 'joi'

import { FieldError } from '../../../../graphql/objects/responses/error/field-error'

export default function generateFieldErrors (details: Joi.ValidationErrorItem[]) {
  return details.map((error) => {
    const dotPath = error.path.join('.')
    const label = (error.context && error.context.label) ? error.context.label : dotPath
    return new FieldError(dotPath, error.type, label, error.message)
  })
}
