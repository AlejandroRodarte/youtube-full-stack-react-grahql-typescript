import { FieldError } from '../../error/field-error'
import { validateSync } from 'class-validator'

export default function generateFieldErrors<T extends object> (data: T) {
  const validationErrors = validateSync(data)
  return validationErrors.map(({ property, constraints = {} }) => new FieldError(property, Object.keys(constraints).map((key) => constraints[key])))
}
