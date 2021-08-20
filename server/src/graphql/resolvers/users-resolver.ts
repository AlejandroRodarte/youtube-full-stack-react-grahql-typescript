import { Resolver, Arg, Ctx, Mutation, UseMiddleware } from 'type-graphql'
import argon2 from 'argon2'

import { RegisterUserInput, LoginUserInput } from '../args/inputs/mutation/users'
import UsersClasses from '../objects/responses/users'
import { ApplicationContext } from '../../types/graphql'
import { User } from '../../db/orm/entities'
import { DriverException } from '@mikro-orm/core'
import { RegisterArgsSchema, LoginArgsSchema } from '../args/schemas/mutation/users'
import ValidateArgs from '../../generator/graphql/middleware/validate-args'
import Auth from '../middleware/auth'
import * as UsersSymbols from '../constants/responses/symbols/users'
import usersPayloads from '../constants/responses/payloads/users'
import * as DriverExceptionSymbols from '../../db/orm/constants/driver-exception/symbols'
import driverExceptionCodes from '../../db/orm/constants/driver-exception/codes'

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
            usersPayloads.success[UsersSymbols.USER_REGISTERED].httpCode,
            usersPayloads.success[UsersSymbols.USER_REGISTERED].message,
            usersPayloads.success[UsersSymbols.USER_REGISTERED].code,
            new UsersClasses
              .data
              .RegisterUserData(user)
          )

      return response
    } catch (e) {
      if (
        e instanceof DriverException &&
        e.code === driverExceptionCodes[DriverExceptionSymbols.UNIQUE_CONSTRAINT_VIOLATION_EXCEPTION]
      ) {
        return new UsersClasses
          .responses
          .RegisterUserResponse(
            usersPayloads.error[UsersSymbols.USERNAME_ALREADY_EXISTS].httpCode,
            usersPayloads.error[UsersSymbols.USERNAME_ALREADY_EXISTS].message,
            usersPayloads.error[UsersSymbols.USERNAME_ALREADY_EXISTS].code
          )
      }

      return new UsersClasses
        .responses
        .RegisterUserResponse(
          usersPayloads.error[UsersSymbols.MUTATION_REGISTER_ERROR].httpCode,
          usersPayloads.error[UsersSymbols.MUTATION_REGISTER_ERROR].message,
          usersPayloads.error[UsersSymbols.MUTATION_REGISTER_ERROR].code
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
            usersPayloads.error[UsersSymbols.USER_NOT_FOUND].httpCode,
            usersPayloads.error[UsersSymbols.USER_NOT_FOUND].message,
            usersPayloads.error[UsersSymbols.USER_NOT_FOUND].code
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
            usersPayloads.error[UsersSymbols.INCORRECT_PASSWORD].httpCode,
            usersPayloads.error[UsersSymbols.INCORRECT_PASSWORD].message,
            usersPayloads.error[UsersSymbols.INCORRECT_PASSWORD].code
          )
      }

      req.session.userId = user.id

      return new UsersClasses
        .responses
        .LoginUserResponse(
          usersPayloads.success[UsersSymbols.USER_LOGGED_IN].httpCode,
          usersPayloads.success[UsersSymbols.USER_LOGGED_IN].message,
          usersPayloads.success[UsersSymbols.USER_LOGGED_IN].code,
          new UsersClasses
            .data
            .LoginUserData(user)
        )
    } catch (e) {
      return new UsersClasses
        .responses
        .LoginUserResponse(
          usersPayloads.error[UsersSymbols.MUTATION_LOGIN_ERROR].httpCode,
          usersPayloads.error[UsersSymbols.MUTATION_LOGIN_ERROR].message,
          usersPayloads.error[UsersSymbols.MUTATION_LOGIN_ERROR].code
        )
    }
  }

  @Mutation(() => UsersClasses.responses.MeUserResponse)
  @UseMiddleware(Auth)
  async me (
    @Ctx() { db, req }: ApplicationContext
  ) {
    try {
      const user = await db.findOne(User, { id: req.session.userId })

      if (!user) {
        return new UsersClasses
          .responses
          .MeUserResponse(
            usersPayloads.error[UsersSymbols.USER_NOT_FOUND].httpCode,
            usersPayloads.error[UsersSymbols.USER_NOT_FOUND].message,
            usersPayloads.error[UsersSymbols.USER_NOT_FOUND].code
          )
      }

      return new UsersClasses
        .responses
        .MeUserResponse(
          usersPayloads.success[UsersSymbols.OWN_USER_FETCHED].httpCode,
          usersPayloads.success[UsersSymbols.OWN_USER_FETCHED].message,
          usersPayloads.success[UsersSymbols.OWN_USER_FETCHED].code,
          new UsersClasses
            .data
            .MeUserData(user)
        )
    } catch (e) {
      return new UsersClasses
        .responses
        .RegisterUserResponse(
          usersPayloads.error[UsersSymbols.MUTATION_ME_ERROR].httpCode,
          usersPayloads.error[UsersSymbols.MUTATION_ME_ERROR].message,
          usersPayloads.error[UsersSymbols.MUTATION_ME_ERROR].code
        )
    }
  }
}
