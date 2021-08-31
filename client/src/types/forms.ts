import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

export namespace FormTypes {
  interface CommonFieldPayload {
    label: string
  }

  interface AdaptedInputHTMLAttributes extends InputHTMLAttributes<HTMLInputElement> {
    name: string
  }

  interface AdaptedTextareaHTMLAttributes extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: string
  }

  interface InputFieldPayload extends CommonFieldPayload {
    htmlAttributes: AdaptedInputHTMLAttributes
  }

  interface TextareaFieldPayload extends CommonFieldPayload {
    htmlAttributes: AdaptedTextareaHTMLAttributes
  }

  export interface InputFieldProps {
    type: 'input'
    payload: InputFieldPayload
  }

  export interface TextareaFieldProps {
    type: 'textarea'
    payload: TextareaFieldPayload
  }

  export type FieldProps = InputFieldProps | TextareaFieldProps

  export type FormFieldsConfig<T> = {
    // eslint-disable-next-line no-unused-vars
    [K in keyof T]: FieldProps
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

  export interface CreatePostForm {
    title: string
    text: string
  }
}
