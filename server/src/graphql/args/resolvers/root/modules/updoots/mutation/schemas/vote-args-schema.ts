import Joi from 'joi'

import { GraphQLArgs } from '../../../../../../../../types/graphql'

import commonPrimitives from '../../../../../../common/primitive'
import primitive from './primitive'

interface VoteDataSchemaInterface {
  postId: Joi.NumberSchema
  value: Joi.NumberSchema
}

interface VoteArgsSchemaInterface extends GraphQLArgs.NamespaceSchema {
  data: Joi.ObjectSchema<VoteDataSchemaInterface>
}

const VoteArgsDataSchema =
  Joi
    .object<VoteDataSchemaInterface>()
    .keys({
      postId: primitive.postIdSchema,
      value: primitive.valueSchema
    })

const VoteArgsSchema =
  Joi
    .object<VoteArgsSchemaInterface>()
    .keys({
      namespace: commonPrimitives.namespaceSchema,
      data: VoteArgsDataSchema
    })

export default VoteArgsSchema
