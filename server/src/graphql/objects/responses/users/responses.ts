import { ObjectType } from 'type-graphql'

import { LoginUserData, RegisterUserData, MeUserData, LogoutUserData, ForgotPasswordData, ChangePasswordData } from './data'
import { FieldError } from '../error/field-error'
import ApplicationResponse from '../../../../generator/graphql/responses/application-response'

@ObjectType()
export class RegisterUserResponse extends ApplicationResponse(
  RegisterUserData,
  FieldError
) {}

@ObjectType()
export class LoginUserResponse extends ApplicationResponse(
  LoginUserData,
  FieldError
) {}

@ObjectType()
export class MeUserResponse extends ApplicationResponse(
  MeUserData,
  FieldError
) {}

@ObjectType()
export class LogoutUserResponse extends ApplicationResponse(
  LogoutUserData,
  FieldError
) {}

@ObjectType()
export class ForgotPasswordResponse extends ApplicationResponse(
  ForgotPasswordData,
  FieldError
) {}

@ObjectType()
export class ChangePasswordResponse extends ApplicationResponse(
  ChangePasswordData,
  FieldError
) {}
