import { RegisterUserInput } from '../../../../generated/graphql'

export interface RegisterArgsInput {
  registerData: RegisterUserInput
}

interface RegisterDataErrors {
  username?: string
  password?: string
}

export interface RegisterArgsErrors {
  data: RegisterDataErrors
}
