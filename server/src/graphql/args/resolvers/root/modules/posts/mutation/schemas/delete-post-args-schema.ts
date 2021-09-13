import Joi from 'joi'

import { GraphQLArgs } from '../../../../../../../../types/graphql'

import commonPrimitives from '../../../../../../common/primitive'
import primitive from './primitive'

interface DeletePostDataSchemaInterface {
  id: Joi.NumberSchema
}

interface DeletePostArgsSchemaInterface extends GraphQLArgs.NamespaceSchema {
  data: Joi.ObjectSchema<DeletePostDataSchemaInterface>
}

const DeletePostDataSchema =
  Joi
    .object<DeletePostDataSchemaInterface>()
    .keys({
      id: primitive.postIdSchema
    })

const DeletePostArgsSchema =
  Joi
    .object<DeletePostArgsSchemaInterface>()
    .keys({
      namespace: commonPrimitives.namespaceSchema,
      data: DeletePostDataSchema
    })

export default DeletePostArgsSchema
