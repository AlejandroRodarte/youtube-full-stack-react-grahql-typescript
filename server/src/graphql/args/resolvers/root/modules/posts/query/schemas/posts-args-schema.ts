import Joi from 'joi'

import { GraphQLArgs } from '../../../../../../../../types/graphql'

import commonPrimitives from '../../../../../../common/primitive'
import primitive from './primitive'

interface PostsDataSchemaInterface {
  limit: Joi.NumberSchema
  sort: Joi.StringSchema
  excludeIds: Joi.AlternativesSchema
  cursor: Joi.AlternativesSchema
  timestamp: Joi.AlternativesSchema
}

interface PostArgsSchemaInterface extends GraphQLArgs.NamespaceSchema {
  data: Joi.ObjectSchema<PostsDataSchemaInterface>
}

const PostDataSchema =
  Joi
    .object<PostsDataSchemaInterface>()
    .keys({
      limit: primitive.limitSchema,
      sort: primitive.sortSchema,
      excludeIds: primitive.excludeIdsSchema,
      cursor: primitive.cursorSchema,
      timestamp: primitive.timestampSchema
    })

const PostsArgsSchema =
  Joi
    .object<PostArgsSchemaInterface>()
    .keys({
      namespace: commonPrimitives.namespaceSchema,
      data: PostDataSchema
    })

export default PostsArgsSchema
