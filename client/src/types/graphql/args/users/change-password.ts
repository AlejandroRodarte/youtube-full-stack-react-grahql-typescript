interface ChangePasswordFormErrors {
  newPassword?: string
}

interface ChangePasswordDataErrors {
  token?: string,
  form?: ChangePasswordFormErrors
}

interface ChangePasswordEtcErrors {
  id?: string
}

export interface ChangePasswordArgsErrors {
  data: ChangePasswordDataErrors
  etc: ChangePasswordEtcErrors
}
