import { ObjectType } from 'type-graphql'

import ApplicationResponse from '../../../../../../../generator/graphql/objects/application-response'
import LoginData from './login-data'
import FieldError from '../../../../../../objects/common/error/field-error'

@ObjectType()
export default class LoginResponse extends ApplicationResponse(
  LoginData,
  FieldError
) {}
