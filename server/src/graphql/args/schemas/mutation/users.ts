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
    .try(
      usernameSchema,
      emailSchema
    )

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
      credential: credentialSchema,
      password: passwordSchema
    })

const LoginArgsSchema =
  Joi
    .object()
    .keys({ data: LoginDataSchema })

/**
 * forgotPassword() mutation on users-resolver.ts
 */

const ForgotPasswordDataSchema =
  Joi
    .object()
    .keys({ email: emailSchema })

const ForgotPasswordArgsSchema =
  Joi
    .object()
    .keys({ data: ForgotPasswordDataSchema })

export {
  RegisterArgsSchema,
  LoginArgsSchema,
  ForgotPasswordArgsSchema
}
