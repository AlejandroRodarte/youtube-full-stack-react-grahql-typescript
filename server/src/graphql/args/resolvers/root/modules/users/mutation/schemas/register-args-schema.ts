import Joi from 'joi'

import primitive from './primitive'

interface RegisterDataSchemaInterface {
  username: Joi.StringSchema
  email: Joi.StringSchema
  password: Joi.StringSchema
}

interface RegisterArgsSchemaInterface {
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
    .keys({ data: RegisterDataSchema })

export default RegisterArgsSchema
