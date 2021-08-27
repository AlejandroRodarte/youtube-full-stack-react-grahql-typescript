export interface InputFieldProps {
  name: string,
  label: string
  placeholder: string
  type: string
}

export type FormFieldsConfig<T> = {
  // eslint-disable-next-line no-unused-vars
  [K in keyof T]: InputFieldProps
}
interface CredentialsForm {
  username: string
  password: string
}

export interface LoginForm extends CredentialsForm {}

export interface RegisterForm extends CredentialsForm {
  email: string
}
