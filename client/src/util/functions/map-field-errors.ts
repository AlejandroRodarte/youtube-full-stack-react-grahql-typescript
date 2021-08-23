import { FieldError } from '../../generated/graphql'

export default function mapFieldErrorsToFormikErrors (fieldErrors: FieldError[]) {
  const formikErrors: Record<string, string> = {}

  fieldErrors.forEach(({ path, message }) => {
    formikErrors[path] = message
  })

  return formikErrors
}
