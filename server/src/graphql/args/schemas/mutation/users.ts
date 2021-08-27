import Joi from 'joi'

const usernameSchema =
  Joi
    .string()
    .required()
    .min(3)
    .max(50)
    .label('Username')

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

/**
 * register() mutation on users-resolver.ts
 */

const RegisterDataSchema =
  Joi
    .object()
    .keys({
      username: usernameSchema,
      email: emailSchema,
      password: passwordSchema
    })

const RegisterArgsSchema =
  Joi
    .object()
    .keys({ data: RegisterDataSchema })

/**
 * login() mutation on users-resolver.ts
 */

const LoginDataSchema =
  Joi
    .object()
    .keys({
      username: usernameSchema,
      password: passwordSchema
    })

const LoginArgsSchema =
  Joi
    .object()
    .keys({ data: LoginDataSchema })

export {
  RegisterArgsSchema,
  LoginArgsSchema
}
