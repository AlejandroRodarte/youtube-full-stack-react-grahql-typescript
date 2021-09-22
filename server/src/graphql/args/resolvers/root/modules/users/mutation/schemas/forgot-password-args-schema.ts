import Joi from 'joi'

import { GraphQLArgs } from '../../../../../../../../types/graphql'

import commonPrimitives from '../../../../../../common/primitive'
import primitive from './primitive'

interface ForgotPasswordDataSchemaInterface {
  email: Joi.StringSchema
}

interface ForgotPasswordArgsSchemaInterface extends GraphQLArgs.NamespaceSchema {
  data: Joi.ObjectSchema<ForgotPasswordDataSchemaInterface>
}

const ForgotPasswordDataSchema =
  Joi
    .object<ForgotPasswordDataSchemaInterface>()
    .keys({ email: primitive.emailSchema })

const ForgotPasswordArgsSchema =
  Joi
    .object<ForgotPasswordArgsSchemaInterface>()
    .keys({
      namespace: commonPrimitives.namespaceSchema,
      data: ForgotPasswordDataSchema
    })

export default ForgotPasswordArgsSchema
