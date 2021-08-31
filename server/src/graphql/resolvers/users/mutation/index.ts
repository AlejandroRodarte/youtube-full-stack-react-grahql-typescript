import { NonEmptyArray } from 'type-graphql'

import RegisterResolver from './register-resolver'
import LoginResolver from './login-resolver'
import LogoutResolver from './logout-resolver'
import ChangePasswordResolver from './change-password-resolver'
import ForgotPasswordResolver from './forgot-password-resolver'

const mutation: NonEmptyArray<Function> = [
  RegisterResolver,
  LoginResolver,
  LogoutResolver,
  ChangePasswordResolver,
  ForgotPasswordResolver
]

export default mutation
