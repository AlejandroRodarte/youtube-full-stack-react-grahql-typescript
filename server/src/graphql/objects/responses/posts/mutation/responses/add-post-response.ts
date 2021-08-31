import { ObjectType } from 'type-graphql'

import ApplicationResponse from '../../../../../../generator/graphql/responses/application-response'
import AddPostData from '../data/add-post-data'
import FieldError from '../../../error/field-error'

@ObjectType()
export default class AddPostResponse extends ApplicationResponse(
  AddPostData,
  FieldError
) {}
