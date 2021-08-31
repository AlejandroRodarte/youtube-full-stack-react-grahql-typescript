import Joi from 'joi'

const usernameSchema =
  Joi
    .string()
    .required()
    .min(3)
    .max(50)
    .regex(/^[^@]+$/)
    .label('Username')
    .messages({
      'string.pattern.base': '"Username" must not have "@" characters on it.'
    })

const emailSchema =
  Joi
    .string()
    .required()
    .email({ tlds: { allow: false } })
    .label('Email')

const passwordSchema =
  Joi
    .string()
    .required()
    .min(7)
    .max(255)
    .label('Password')

const credentialSchema =
  Joi
    .alternatives()
    .required()
    .try(
      emailSchema
        .messages({
          'string.email': 'If email, it must be a valid email.',
          'string.empty': 'If email, it can not be empty.'
        }),
      usernameSchema
        .messages({
          'string.pattern.base': 'If username, it must not have "@" characters on it.',
          'string.min': 'If username, it should have a minimum of {#limit} characters.',
          'string.max': 'If username, it should have a maximum of {#limit} characters.',
          'string.empty': 'If username, it can not be empty.'
        })
    )
    .label('Credential')

const tokenSchema =
  Joi
    .string()
    .required()
    .regex(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)
    .label('Token')
    .messages({
      'string.pattern.base': '"Token" must be a valid uuid v4 ID.'
    })

const primitive = {
  usernameSchema,
  emailSchema,
  passwordSchema,
  credentialSchema,
  tokenSchema
}

export default primitive
