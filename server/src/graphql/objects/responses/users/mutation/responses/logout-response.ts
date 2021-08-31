import { ObjectType } from 'type-graphql'

import ApplicationResponse from '../../../../../../generator/graphql/responses/application-response'
import LogoutData from '../data/logout-data'
import FieldError from '../../../error/field-error'

@ObjectType()
export default class LogoutResponse extends ApplicationResponse(
  LogoutData,
  FieldError
) {}
