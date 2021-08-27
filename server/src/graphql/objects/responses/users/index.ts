import { RegisterUserData, LoginUserData, MeUserData, LogoutUserData, ForgotPasswordData } from './data'
import { RegisterUserResponse, LoginUserResponse, MeUserResponse, LogoutUserResponse, ForgotPasswordResponse } from './responses'

const responses = {
  RegisterUserResponse,
  LoginUserResponse,
  MeUserResponse,
  LogoutUserResponse,
  ForgotPasswordResponse
}

const data = {
  RegisterUserData,
  LoginUserData,
  MeUserData,
  LogoutUserData,
  ForgotPasswordData
}

const classes = {
  responses,
  data
}

export default classes
