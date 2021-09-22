import { NonEmptyArray } from 'type-graphql'

import RootRegisterResolver from './register-resolver'
import RootLoginResolver from './login-resolver'
import RootLogoutResolver from './logout-resolver'
import RootChangePasswordResolver from './change-password-resolver'
import RootForgotPasswordResolver from './forgot-password-resolver'

const mutation: NonEmptyArray<Function> = [
  RootRegisterResolver,
  RootLoginResolver,
  RootLogoutResolver,
  RootChangePasswordResolver,
  RootForgotPasswordResolver
]

export default mutation
