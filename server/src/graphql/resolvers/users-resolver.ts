import { Resolver, Arg, Ctx, Mutation } from 'type-graphql'
import argon2 from 'argon2'

import { RegisterUserInput } from '../inputs/users'
import UsersClasses from '../objects/responses/users'
import { ApplicationContext } from '../../types/graphql'
import generateFieldErrors from '../../util/functions/graphql/responses/generate-field-errors'
import { User } from '../../db/orm/entities'
import { UniqueConstraintViolationException } from '@mikro-orm/core'
import { LoginUserInput } from '../inputs/users/login-user-inputs'
import { FieldError } from '../objects/responses/error'

@Resolver()
export default class UserResolver {
  @Mutation(() => UsersClasses.responses.RegisterUserResponse)
  async register (
    @Arg('data', () => RegisterUserInput) data: RegisterUserInput,
    @Ctx() { db }: ApplicationContext
  ) {
    const fieldErrors = generateFieldErrors<RegisterUserInput>(data)
    if (fieldErrors.length > 0) return new UsersClasses.responses.RegisterUserResponse(400, 'There was validation errors while validating the user.', 'MUTATION_REGISTER_VALIDATION_ERROR', undefined, fieldErrors)
    try {
      const hashedPassword = await argon2.hash(data.password)
      const user = db.create(User, {
        username: data.username,
        password: hashedPassword
      })
      await db.persistAndFlush(user)
      const response = new UsersClasses.responses.RegisterUserResponse(201, 'User registered.', 'USER_REGISTERED', new UsersClasses.data.RegisterUserData(user))
      return response
    } catch (e) {
      if (e instanceof UniqueConstraintViolationException && e.code === '23505') return new UsersClasses.responses.RegisterUserResponse(400, 'That username is already taken.', 'USERNAME_EXISTS_ERROR', undefined, [])
      return new UsersClasses.responses.RegisterUserResponse(400, 'There was an error registering the user.', 'MUTATION_REGISTER_ERROR', undefined, [])
    }
  }

  @Mutation(() => UsersClasses.responses.LoginUserResponse)
  async login (
    @Arg('data', () => LoginUserInput) data: LoginUserInput,
    @Ctx() { db }: ApplicationContext
  ) {
    const fieldErrors = generateFieldErrors<LoginUserInput>(data)
    if (fieldErrors.length > 0) return new UsersClasses.responses.LoginUserResponse(400, 'There was validation errors while validating the login data.', 'MUTATION_LOGIN_VALIDATION_ERROR', undefined, fieldErrors)
    try {
      const user = await db.findOne(User, { username: data.username })
      if (!user) return new UsersClasses.responses.LoginUserResponse(404, 'The user was not found.', 'USER_NOT_FOUND_ERROR', undefined, [new FieldError('username', ['That username does not exist.'])])
      const isCorrectPassword = await argon2.verify(user.password, data.password)
      if (!isCorrectPassword) return new UsersClasses.responses.LoginUserResponse(401, 'The password is incorrect.', 'USER_PASSWORD_INCORRECT_ERROR', undefined, [new FieldError('password', ['Wrong password.'])])
      return new UsersClasses.responses.LoginUserResponse(200, 'User logged in.', 'USER_LOGGED_IN', new UsersClasses.data.LoginUserData(user))
    } catch (e) {
      return new UsersClasses.responses.LoginUserResponse(401, 'There was an error logging in the user.', 'MUTATION_LOGIN_ERROR', undefined, [])
    }
  }
}
