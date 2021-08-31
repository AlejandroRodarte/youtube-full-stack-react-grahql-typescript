import { ObjectType } from 'type-graphql'

import ApplicationResponse from '../../../../../../generator/graphql/responses/application-response'
import LoginData from '../data/login-data'
import FieldError from '../../../error/field-error'

@ObjectType()
export default class LoginResponse extends ApplicationResponse(
  LoginData,
  FieldError
) {}
