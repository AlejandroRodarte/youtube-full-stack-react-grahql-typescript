import Joi from 'joi'

import primitive from './primitive'

interface ForgotPasswordDataSchemaInterface {
  email: Joi.StringSchema
}

interface ForgotPasswordArgsSchemaInterface {
  data: Joi.ObjectSchema<ForgotPasswordDataSchemaInterface>
}

const ForgotPasswordDataSchema =
  Joi
    .object<ForgotPasswordDataSchemaInterface>()
    .keys({ email: primitive.emailSchema })

const ForgotPasswordArgsSchema =
  Joi
    .object<ForgotPasswordArgsSchemaInterface>()
    .keys({ data: ForgotPasswordDataSchema })

export default ForgotPasswordArgsSchema
