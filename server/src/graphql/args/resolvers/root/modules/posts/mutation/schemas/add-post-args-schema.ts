import Joi from 'joi'

import { GraphQLArgs } from '../../../../../../../../types/graphql'

import commonPrimitives from '../../../../../../common/primitive'
import primitive from './primitive'

interface AddPostDataSchemaInterface {
  title: Joi.StringSchema
  text: Joi.StringSchema
}

interface AddPostArgsSchemaInterface extends GraphQLArgs.NamespaceSchema {
  data: Joi.ObjectSchema<AddPostDataSchemaInterface>
}

const AddPostDataSchema =
  Joi
    .object<AddPostDataSchemaInterface>()
    .keys({
      title:
        primitive
          .titleSchema
          .required(),
      text:
        primitive
          .textSchema
          .required()
    })

const AddPostArgsSchema =
  Joi
    .object<AddPostArgsSchemaInterface>()
    .keys({
      namespace: commonPrimitives.namespaceSchema,
      data: AddPostDataSchema
    })

export default AddPostArgsSchema
