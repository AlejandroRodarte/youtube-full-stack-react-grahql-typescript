import { validateSync } from 'class-validator'

import { FieldError } from '../../../../graphql/objects/responses/error/field-error'

export default function generateFieldErrors<T extends object> (data: T) {
  const validationErrors = validateSync(data)
  return validationErrors.map(({ property, constraints = {} }) => new FieldError(property, Object.keys(constraints).map((key) => constraints[key])))
}
