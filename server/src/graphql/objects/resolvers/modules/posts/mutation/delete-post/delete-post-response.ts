import { ObjectType } from 'type-graphql'

import ApplicationResponse from '../../../../../../../generator/graphql/objects/application-response'
import DeletePostData from './delete-post-data'
import FieldError from '../../../../../../objects/common/error/field-error'

@ObjectType()
export default class DeletePostResponse extends ApplicationResponse(
  DeletePostData,
  FieldError
) {}
