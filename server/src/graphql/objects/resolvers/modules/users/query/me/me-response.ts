import { ObjectType } from 'type-graphql'

import ApplicationResponse from '../../../../../../../generator/graphql/objects/application-response'
import MeData from './me-data'
import FieldError from '../../../../../../objects/common/error/field-error'

@ObjectType()
export default class MeResponse extends ApplicationResponse(
  MeData,
  FieldError
) {}
