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

export interface LoginForm {
  credential: string
  password: string
}

export interface RegisterForm {
  username: string
  email: string
  password: string
}

export interface ForgotPasswordForm {
  email: string
}

export interface ChangePasswordForm {
  newPassword: string
}
