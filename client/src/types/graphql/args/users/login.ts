import { LoginUserInput } from '../../../../generated/graphql'

export interface LoginArgsInput {
  loginData: LoginUserInput
}

interface LoginDataErrors {
  username?: string
  password?: string
}

export interface LoginArgsErrors {
  data: LoginDataErrors
}
