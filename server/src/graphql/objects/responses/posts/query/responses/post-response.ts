import { ObjectType } from 'type-graphql'

import ApplicationResponse from '../../../../../../generator/graphql/responses/application-response'
import PostData from '../data/post-data'
import FieldError from '../../../error/field-error'

@ObjectType()
export default class PostResponse extends ApplicationResponse(
  PostData,
  FieldError
) {}
