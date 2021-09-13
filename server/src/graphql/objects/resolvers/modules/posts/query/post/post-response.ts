import { ObjectType } from 'type-graphql'

import ApplicationResponse from '../../../../../../../generator/graphql/objects/application-response'
import PostData from './post-data'
import FieldError from '../../../../../../objects/common/error/field-error'

@ObjectType()
export default class PostResponse extends ApplicationResponse(
  PostData,
  FieldError
) {}
