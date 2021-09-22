import Joi from 'joi'

import { GraphQLArgs } from '../../../../../../../../types/graphql'

import commonPrimitives from '../../../../../../common/primitive'
import primitive from './primitive'

interface PostDataSchemaInterface {
  id: Joi.NumberSchema
}

interface PostArgsSchemaInterface extends GraphQLArgs.NamespaceSchema {
  data: Joi.ObjectSchema<PostDataSchemaInterface>
}

const PostDataSchema =
  Joi
    .object<PostDataSchemaInterface>()
    .keys({
      id: primitive.postIdSchema
    })

const PostArgsSchema =
  Joi
    .object<PostArgsSchemaInterface>()
    .keys({
      namespace: commonPrimitives.namespaceSchema,
      data: PostDataSchema
    })

export default PostArgsSchema
