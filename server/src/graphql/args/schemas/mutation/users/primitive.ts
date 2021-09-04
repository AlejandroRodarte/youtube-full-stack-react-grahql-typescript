import Joi from 'joi'

import regex from '../../../../../constants/regex'

const usernameSchema =
  Joi
    .string()
    .required()
    .min(3)
    .max(50)
    .regex(regex.noAtSigns)
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
    .regex(regex.uuid)
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
