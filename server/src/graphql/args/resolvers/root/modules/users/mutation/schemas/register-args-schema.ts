import Joi from 'joi'

import { GraphQLArgs } from '../../../../../../../../types/graphql'

import commonPrimitives from '../../../../../../common/primitive'
import primitive from './primitive'

interface RegisterDataSchemaInterface {
  username: Joi.StringSchema
  email: Joi.StringSchema
  password: Joi.StringSchema
}

interface RegisterArgsSchemaInterface extends GraphQLArgs.NamespaceSchema {
  data: Joi.ObjectSchema<RegisterDataSchemaInterface>
}

const RegisterDataSchema =
  Joi
    .object<RegisterDataSchemaInterface>()
    .keys({
      username: primitive.usernameSchema,
      email: primitive.emailSchema,
      password: primitive.passwordSchema
    })

const RegisterArgsSchema =
  Joi
    .object<RegisterArgsSchemaInterface>()
    .keys({
      namespace: commonPrimitives.namespaceSchema,
      data: RegisterDataSchema
    })

export default RegisterArgsSchema
