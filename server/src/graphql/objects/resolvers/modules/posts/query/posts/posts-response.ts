import { ObjectType } from 'type-graphql'

import ApplicationResponse from '../../../../../../../generator/graphql/objects/application-response'
import PostsData from './posts-data'
import FieldError from '../../../../../../objects/common/error/field-error'

@ObjectType()
export default class PostsResponse extends ApplicationResponse(
  PostsData,
  FieldError
) {}
