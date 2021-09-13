import { ObjectType } from 'type-graphql'

import ApplicationResponse from '../../../../../../../generator/graphql/objects/application-response'
import EditPostData from './edit-post-data'
import FieldError from '../../../../../../objects/common/error/field-error'

@ObjectType()
export default class EditPostResponse extends ApplicationResponse(
  EditPostData,
  FieldError
) {}
