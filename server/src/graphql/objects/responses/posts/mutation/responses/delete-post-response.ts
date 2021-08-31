import { ObjectType } from 'type-graphql'

import ApplicationResponse from '../../../../../../generator/graphql/responses/application-response'
import DeletePostData from '../data/delete-post-data'
import FieldError from '../../../error/field-error'

@ObjectType()
export default class DeletePostResponse extends ApplicationResponse(
  DeletePostData,
  FieldError
) {}
