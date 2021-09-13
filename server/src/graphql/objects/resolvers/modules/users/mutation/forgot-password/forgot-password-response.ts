import { ObjectType } from 'type-graphql'

import ApplicationResponse from '../../../../../../../generator/graphql/objects/application-response'
import ForgotPasswordData from './forgot-password-data'
import FieldError from '../../../../../../objects/common/error/field-error'

@ObjectType()
export default class ForgotPasswordResponse extends ApplicationResponse(
  ForgotPasswordData,
  FieldError
) {}
