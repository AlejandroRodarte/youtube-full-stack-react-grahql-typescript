import Joi from 'joi'

import { GraphQLArgs } from '../../../../../../../../types/graphql'

import commonPrimitives from '../../../../../../common/primitive'
import primitive from './primitive'

interface LoginDataSchemaInterface {
  credential: Joi.AlternativesSchema
  password: Joi.StringSchema
}

interface LoginArgsSchemaInterface extends GraphQLArgs.NamespaceSchema {
  data: Joi.ObjectSchema<LoginDataSchemaInterface>
}

const LoginDataSchema =
  Joi
    .object<LoginDataSchemaInterface>()
    .keys({
      credential: primitive.credentialSchema,
      password: primitive.passwordSchema
    })

const LoginArgsSchema =
  Joi
    .object<LoginArgsSchemaInterface>()
    .keys({
      namespace: commonPrimitives.namespaceSchema,
      data: LoginDataSchema
    })

export default LoginArgsSchema
