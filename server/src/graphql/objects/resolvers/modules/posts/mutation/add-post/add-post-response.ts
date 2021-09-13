import { ObjectType } from 'type-graphql'

import ApplicationResponse from '../../../../../../../generator/graphql/objects/application-response'
import AddPostData from './add-post-data'
import FieldError from '../../../../../../objects/common/error/field-error'

@ObjectType()
export default class AddPostResponse extends ApplicationResponse(
  AddPostData,
  FieldError
) {}
