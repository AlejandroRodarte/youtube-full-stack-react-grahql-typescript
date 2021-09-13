import { ObjectType } from 'type-graphql'

import ApplicationResponse from '../../../../../../../generator/graphql/objects/application-response'
import VoteData from './vote-data'
import FieldError from '../../../../../../objects/common/error/field-error'

@ObjectType()
export default class VoteResponse extends ApplicationResponse(
  VoteData,
  FieldError
) {}
