export namespace GraphQLUsersArgs {
  interface ChangePasswordFormErrors {
    newPassword?: string
  }

  interface ChangePasswordDataErrors {
    token?: string
    form?: ChangePasswordFormErrors
  }

  interface ChangePasswordEtcErrors {
    id?: string
  }

  export interface ChangePasswordArgsErrors {
    data: ChangePasswordDataErrors
    etc: ChangePasswordEtcErrors
  }

  interface ForgotPasswordDataErrors {
    email?: string
  }

  export interface ForgotPasswordArgsErrors {
    data: ForgotPasswordDataErrors
  }

  interface LoginDataErrors {
    username?: string
    password?: string
  }

  export interface LoginArgsErrors {
    data: LoginDataErrors
  }

  interface RegisterDataErrors {
    username?: string
    password?: string
  }

  export interface RegisterArgsErrors {
    data: RegisterDataErrors
  }
}
