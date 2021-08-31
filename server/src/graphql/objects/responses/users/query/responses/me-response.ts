import { ObjectType } from 'type-graphql'

import ApplicationResponse from '../../../../../../generator/graphql/responses/application-response'
import MeData from '../data/me-data'
import FieldError from '../../../error/field-error'

@ObjectType()
export default class MeResponse extends ApplicationResponse(
  MeData,
  FieldError
) {}
