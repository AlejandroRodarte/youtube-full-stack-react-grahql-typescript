import { ObjectType } from 'type-graphql'

import ApplicationResponse from '../../../../../../generator/graphql/responses/application-response'
import ForgotPasswordData from '../data/forgot-password-data'
import FieldError from '../../../error/field-error'

@ObjectType()
export default class ForgotPasswordResponse extends ApplicationResponse(
  ForgotPasswordData,
  FieldError
) {}
