import { ObjectType } from 'type-graphql'

import ApplicationResponse from '../../../../../../../generator/graphql/objects/application-response'
import RegisterData from './register-data'
import FieldError from '../../../../../../objects/common/error/field-error'

@ObjectType()
export default class RegisterResponse extends ApplicationResponse(
  RegisterData,
  FieldError
) {}
