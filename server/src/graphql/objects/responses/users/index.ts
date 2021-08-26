import { RegisterUserData, LoginUserData, MeUserData, LogoutUserData } from './data'
import { RegisterUserResponse, LoginUserResponse, MeUserResponse, LogoutUserResponse } from './responses'

const responses = {
  RegisterUserResponse,
  LoginUserResponse,
  MeUserResponse,
  LogoutUserResponse
}

const data = {
  RegisterUserData,
  LoginUserData,
  MeUserData,
  LogoutUserData
}

const classes = {
  responses,
  data
}

export default classes
