import { ObjectType } from 'type-graphql'

import ApplicationResponse from '../../../../../../generator/graphql/responses/application-response'
import ChangePasswordData from '../data/change-password-data'
import FieldError from '../../../error/field-error'

@ObjectType()
export default class ChangePasswordResponse extends ApplicationResponse(
  ChangePasswordData,
  FieldError
) {}
