import { RegisterUserData, LoginUserData, MeUserData, LogoutUserData, ForgotPasswordData, ChangePasswordData } from './data'
import { RegisterUserResponse, LoginUserResponse, MeUserResponse, LogoutUserResponse, ForgotPasswordResponse, ChangePasswordResponse } from './responses'

const responses = {
  RegisterUserResponse,
  LoginUserResponse,
  MeUserResponse,
  LogoutUserResponse,
  ForgotPasswordResponse,
  ChangePasswordResponse
}

const data = {
  RegisterUserData,
  LoginUserData,
  MeUserData,
  LogoutUserData,
  ForgotPasswordData,
  ChangePasswordData
}

const classes = {
  responses,
  data
}

export default classes
