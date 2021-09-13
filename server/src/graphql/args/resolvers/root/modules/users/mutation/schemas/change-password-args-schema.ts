import Joi from 'joi'

import { GraphQLArgs } from '../../../../../../../../types/graphql'

import commonPrimitives from '../../../../../../common/primitive'
import primitive from './primitive'

interface ChangePasswordDataFormSchemaInterface {
  newPassword: Joi.StringSchema
}
interface ChangePasswordDataSchemaInterface {
  token: Joi.StringSchema
  form: Joi.ObjectSchema<ChangePasswordDataFormSchemaInterface>
}

interface ChangePasswordArgsSchemaInterface extends GraphQLArgs.NamespaceSchema {
  data: Joi.ObjectSchema<ChangePasswordDataSchemaInterface>
}

const ChangePasswordDataSchema =
  Joi
    .object<ChangePasswordDataSchemaInterface>()
    .keys({
      token: primitive.tokenSchema,
      form: Joi
        .object<ChangePasswordDataFormSchemaInterface>()
        .keys({
          newPassword: primitive.passwordSchema
        })
    })

const ChangePasswordArgsSchema =
  Joi
    .object<ChangePasswordArgsSchemaInterface>()
    .keys({
      namespace: commonPrimitives.namespaceSchema,
      data: ChangePasswordDataSchema
    })

export default ChangePasswordArgsSchema
