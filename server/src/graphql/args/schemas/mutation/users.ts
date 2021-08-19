import Joi from 'joi'

/**
 * register() mutation on users-resolver.ts
 */

const RegisterDataSchema = Joi.object().keys({
  username: Joi.string().required().min(3).max(50).label('Username'),
  password: Joi.string().required().min(7).max(255).label('Password')
})

const RegisterArgsSchema = Joi.object().keys({
  data: RegisterDataSchema
})

/**
 * login() mutation on users-resolver.ts
 */

const LoginArgsSchema = RegisterArgsSchema

export { RegisterArgsSchema, LoginArgsSchema }
