import Joi from 'joi'

import primitive from './primitive'

interface LoginDataSchemaInterface {
  credential: Joi.AlternativesSchema
  password: Joi.StringSchema
}

interface LoginArgsSchemaInterface {
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
    .keys({ data: LoginDataSchema })

export default LoginArgsSchema
