import { ObjectType } from 'type-graphql'

import ApplicationResponse from '../../../../../../generator/graphql/responses/application-response'
import PostsData from '../data/posts-data'
import FieldError from '../../../error/field-error'

@ObjectType()
export default class PostsResponse extends ApplicationResponse(
  PostsData,
  FieldError
) {}
