import Joi from 'joi'

import primitive from './primitive'

interface ChangePasswordDataFormSchemaInterface {
  newPassword: Joi.StringSchema
}
interface ChangePasswordDataSchemaInterface {
  token: Joi.StringSchema
  form: Joi.ObjectSchema<ChangePasswordDataFormSchemaInterface>
}

interface ChangePasswordArgsSchemaInterface {
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
    .keys({ data: ChangePasswordDataSchema })

export default ChangePasswordArgsSchema
