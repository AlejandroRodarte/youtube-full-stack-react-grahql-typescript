import { ObjectType } from 'type-graphql'

import ApplicationResponse from '../../../../../../../generator/graphql/objects/application-response'
import LogoutData from './logout-data'
import FieldError from '../../../../../../objects/common/error/field-error'

@ObjectType()
export default class LogoutResponse extends ApplicationResponse(
  LogoutData,
  FieldError
) {}
