import { ObjectType } from 'type-graphql'

import ApplicationResponse from '../../../../../../generator/graphql/responses/application-response'
import RegisterData from '../data/register-data'
import FieldError from '../../../error/field-error'

@ObjectType()
export default class RegisterResponse extends ApplicationResponse(
  RegisterData,
  FieldError
) {}
