import { Resolver, Arg, Ctx, Mutation, UseMiddleware } from 'type-graphql'
import argon2 from 'argon2'

import { RegisterUserInput, LoginUserInput } from '../args/inputs/mutation/users'
import UsersClasses from '../objects/responses/users'
import { ApplicationContext } from '../../types/graphql'
import { User } from '../../db/orm/entities'
import { UniqueConstraintViolationException } from '@mikro-orm/core'
import { RegisterArgsSchema, LoginArgsSchema } from '../args/schemas/mutation/users'
import ValidateArgs from '../../generator/graphql/middleware/validate-args'

@Resolver()
export default class UserResolver {
  @Mutation(() => UsersClasses.responses.RegisterUserResponse)
  @UseMiddleware(ValidateArgs(RegisterArgsSchema))
  async register (
    @Arg('data', () => RegisterUserInput) data: RegisterUserInput,
    @Ctx() { db, req }: ApplicationContext
  ) {
    try {
      const hashedPassword = await argon2.hash(data.password)

      const user = db.create(User, {
        username: data.username,
        password: hashedPassword
      })

      await db.persistAndFlush(user)
      req.session.userId = user.id

      const response =
        new UsersClasses
          .responses
          .RegisterUserResponse(
            201,
            'User registered.',
            'USER_REGISTERED',
            new UsersClasses
              .data
              .RegisterUserData(user)
          )

      return response
    } catch (e) {
      if (e instanceof UniqueConstraintViolationException && e.code === '23505') {
        return new UsersClasses
          .responses
          .RegisterUserResponse(
            400,
            'That username is already taken.',
            'USERNAME_EXISTS_ERROR'
          )
      }

      return new UsersClasses
        .responses
        .RegisterUserResponse(
          400,
          'There was an error registering the user.',
          'MUTATION_REGISTER_ERROR'
        )
    }
  }

  @Mutation(() => UsersClasses.responses.LoginUserResponse)
  @UseMiddleware(ValidateArgs(LoginArgsSchema))
  async login (
    @Arg('data', () => LoginUserInput) data: LoginUserInput,
    @Ctx() { db, req }: ApplicationContext
  ) {
    try {
      const user = await db.findOne(
        User,
        { username: data.username }
      )

      if (!user) {
        return new UsersClasses
          .responses
          .LoginUserResponse(
            404,
            'The user was not found.',
            'USER_NOT_FOUND_ERROR'
          )
      }

      const isCorrectPassword = await argon2.verify(
        user.password,
        data.password
      )

      if (!isCorrectPassword) {
        return new UsersClasses
          .responses
          .LoginUserResponse(
            401,
            'The password is incorrect.',
            'USER_PASSWORD_INCORRECT_ERROR'
          )
      }

      req.session.userId = user.id

      return new UsersClasses
        .responses
        .LoginUserResponse(
          200,
          'User logged in.',
          'USER_LOGGED_IN',
          new UsersClasses
            .data
            .LoginUserData(user)
        )
    } catch (e) {
      return new UsersClasses
        .responses
        .LoginUserResponse(
          401,
          'There was an error logging in the user.',
          'MUTATION_LOGIN_ERROR'
        )
    }
  }
}
