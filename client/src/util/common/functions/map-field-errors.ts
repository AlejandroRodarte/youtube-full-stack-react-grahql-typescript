import { FieldError } from '../../../generated/graphql'

export default function mapFieldErrors (fieldErrors: Partial<FieldError>[]) {
  const formikErrors: Record<string, string> = {}

  fieldErrors.forEach(({ path, message }) => {
    formikErrors[path] = message
  })

  return formikErrors
}
