import { ObjectType } from 'type-graphql'

import ApplicationResponse from '../../../../../../../generator/graphql/objects/application-response'
import ChangePasswordData from './change-password-data'
import FieldError from '../../../../../../objects/common/error/field-error'

@ObjectType()
export default class ChangePasswordResponse extends ApplicationResponse(
  ChangePasswordData,
  FieldError
) {}
