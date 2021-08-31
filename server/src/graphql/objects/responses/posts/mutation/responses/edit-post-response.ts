import { ObjectType } from 'type-graphql'

import ApplicationResponse from '../../../../../../generator/graphql/responses/application-response'
import EditPostData from '../data/edit-post-data'
import FieldError from '../../../error/field-error'

@ObjectType()
export default class EditPostResponse extends ApplicationResponse(
  EditPostData,
  FieldError
) {}
