import Joi from 'joi'

import { GraphQLArgs } from '../../../../../../../../types/graphql'

import commonPrimitives from '../../../../../../common/primitive'
import primitive from './primitive'

interface EditPostDataFieldsSchemaInterface {
  title: Joi.StringSchema
  text: Joi.StringSchema
}
interface EditPostDataSchemaInterface {
  id: Joi.NumberSchema
  fields: Joi.ObjectSchema<EditPostDataFieldsSchemaInterface>
}

interface EditPostArgsSchemaInterface extends GraphQLArgs.NamespaceSchema {
  data: Joi.ObjectSchema<EditPostDataSchemaInterface>
}

const EditPostDataSchema =
  Joi
    .object<EditPostDataSchemaInterface>()
    .keys({
      id: primitive.postIdSchema,
      fields: Joi
        .object<EditPostDataFieldsSchemaInterface>()
        .keys({
          title:
            primitive
              .titleSchema
              .optional(),
          text:
            primitive
              .textSchema
              .optional()
        })
    })

const EditPostArgsSchema =
  Joi
    .object<EditPostArgsSchemaInterface>()
    .keys({
      namespace: commonPrimitives.namespaceSchema,
      data: EditPostDataSchema
    })

export default EditPostArgsSchema
