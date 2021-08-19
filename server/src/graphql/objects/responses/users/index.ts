import { RegisterUserData, LoginUserData, MeUserData } from './data'
import { RegisterUserResponse, LoginUserResponse, MeUserResponse } from './responses'

const responses = {
  RegisterUserResponse,
  LoginUserResponse,
  MeUserResponse
}

const data = {
  RegisterUserData,
  LoginUserData,
  MeUserData
}

const classes = {
  responses,
  data
}

export default classes
