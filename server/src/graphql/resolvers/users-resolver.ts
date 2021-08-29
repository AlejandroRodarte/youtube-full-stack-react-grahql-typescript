import { Resolver, Arg, Ctx, Mutation, Query, UseMiddleware } from 'type-graphql'
import argon2 from 'argon2'
import { v4 } from 'uuid'

import { RegisterInput, LoginInput, ForgotPasswordInput, ChangePasswordInput } from '../args/inputs/mutation/users'
import UsersClasses from '../objects/responses/users'
import { ApplicationContext } from '../../types/graphql'
import { User } from '../../db/orm/entities'
import { RegisterArgsSchema, LoginArgsSchema, ForgotPasswordArgsSchema, ChangePasswordArgsSchema } from '../args/schemas/mutation/users'
import ValidateArgs from '../../generator/graphql/middleware/validate-args'
import { Auth, Anonymous } from '../middleware'
import * as UsersSymbols from '../constants/responses/symbols/users'
import usersPayloads from '../constants/responses/payloads/users'
import { FieldError } from '../objects/responses/error'
import * as ExpressSessionConstants from '../../redis/constants/session'
import * as SharedSymbols from '../constants/responses/symbols/shared'
import sharedPayloads from '../constants/responses/payloads/shared'
import constraintPayloads from '../constants/responses/payloads/constraints'
import { sendHtmlMail } from '../../util/functions/mail'
import * as RedisPrefixSymbols from '../../redis/constants/prefixes/symbols'
import redisPrefixValues from '../../redis/constants/prefixes/values'
import { UpdateUserRawEntity } from '../../types/db'
import { QueryFailedError } from 'typeorm'

@Resolver()
export default class UserResolver {
  @Mutation(() => UsersClasses.responses.RegisterUserResponse)
  @UseMiddleware(Anonymous, ValidateArgs(RegisterArgsSchema))
  async register (
    @Arg('data', () => RegisterInput) data: RegisterInput,
    @Ctx() { req }: ApplicationContext
  ) {
    try {
      const hashedPassword = await argon2.hash(data.password)

      const user = User.create({
        ...data,
        password: hashedPassword
      })

      await user.save()
      req.session.userId = user.id

      const response =
        new UsersClasses
          .responses
          .RegisterUserResponse(
            usersPayloads.success[UsersSymbols.USER_REGISTERED].httpCode,
            usersPayloads.success[UsersSymbols.USER_REGISTERED].message,
            usersPayloads.success[UsersSymbols.USER_REGISTERED].code,
            req.body.operationName,
            new UsersClasses
              .data
              .RegisterUserData(user)
          )

      return response
    } catch (e) {
      if (e instanceof QueryFailedError && e.constraint) {
        return new UsersClasses
          .responses
          .RegisterUserResponse(
            constraintPayloads[e.constraint].httpCode,
            constraintPayloads[e.constraint].message,
            constraintPayloads[e.constraint].code,
            req.body.operationName,
            undefined,
            [
              new FieldError(
                constraintPayloads[e.constraint].fieldError.path,
                constraintPayloads[e.constraint].fieldError.type,
                constraintPayloads[e.constraint].fieldError.label,
                constraintPayloads[e.constraint].fieldError.message
              )
            ]
          )
      }

      return new UsersClasses
        .responses
        .RegisterUserResponse(
          usersPayloads.error[UsersSymbols.MUTATION_REGISTER_ERROR].httpCode,
          usersPayloads.error[UsersSymbols.MUTATION_REGISTER_ERROR].message,
          usersPayloads.error[UsersSymbols.MUTATION_REGISTER_ERROR].code,
          req.body.operationName
        )
    }
  }

  @Mutation(() => UsersClasses.responses.LoginUserResponse)
  @UseMiddleware(Anonymous, ValidateArgs(LoginArgsSchema))
  async login (
    @Arg('data', () => LoginInput) data: LoginInput,
    @Ctx() { req }: ApplicationContext
  ) {
    const key = data.credential.includes('@') ? 'email' : 'username'

    const labelMap = {
      email: 'Email',
      username: 'Username'
    }

    try {
      const user = await User.findOne({ where: { [key]: data.credential } })

      if (!user) {
        return new UsersClasses
          .responses
          .LoginUserResponse(
            sharedPayloads.error[SharedSymbols.USER_NOT_FOUND].httpCode,
            sharedPayloads.error[SharedSymbols.USER_NOT_FOUND].message,
            sharedPayloads.error[SharedSymbols.USER_NOT_FOUND].code,
            req.body.operationName,
            undefined,
            [
              new FieldError(
                'data.credential',
                'db.notexists',
                labelMap[key],
                `That ${key} does not exist.`)
            ]
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
            usersPayloads.error[UsersSymbols.INCORRECT_PASSWORD].code,
            req.body.operationName,
            undefined,
            [
              new FieldError(
                'data.password',
                'db.wrongpassword',
                'Password',
                'The password is wrong.')
            ]
          )
      }

      req.session.userId = user.id

      return new UsersClasses
        .responses
        .LoginUserResponse(
          usersPayloads.success[UsersSymbols.USER_LOGGED_IN].httpCode,
          usersPayloads.success[UsersSymbols.USER_LOGGED_IN].message,
          usersPayloads.success[UsersSymbols.USER_LOGGED_IN].code,
          req.body.operationName,
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
          usersPayloads.error[UsersSymbols.MUTATION_LOGIN_ERROR].code,
          req.body.operationName
        )
    }
  }

  @Query(() => UsersClasses.responses.MeUserResponse)
  @UseMiddleware(Auth)
  async me (
    @Ctx() { req }: ApplicationContext
  ) {
    const user = req.user!

    return new UsersClasses
      .responses
      .MeUserResponse(
        usersPayloads.success[UsersSymbols.OWN_USER_FETCHED].httpCode,
        usersPayloads.success[UsersSymbols.OWN_USER_FETCHED].message,
        usersPayloads.success[UsersSymbols.OWN_USER_FETCHED].code,
        req.body.operationName,
        new UsersClasses
          .data
          .MeUserData(user)
      )
  }

  @Mutation(() => UsersClasses.responses.LogoutUserResponse)
  @UseMiddleware(Auth)
  async logout (
    @Ctx() { req, res }: ApplicationContext
  ) {
    const wasSessionDestroyed = await new Promise<boolean>((resolve) => {
      res.clearCookie(ExpressSessionConstants.SESSION_COOKIE_NAME)

      req
        .session
        .destroy((error) => {
          if (error) resolve(false)
          resolve(true)
        })
    })

    if (wasSessionDestroyed) {
      return new UsersClasses
        .responses
        .LogoutUserResponse(
          usersPayloads.success[UsersSymbols.USER_LOGGED_OUT].httpCode,
          usersPayloads.success[UsersSymbols.USER_LOGGED_OUT].message,
          usersPayloads.success[UsersSymbols.USER_LOGGED_OUT].code,
          req.body.operationName,
          new UsersClasses
            .data
            .LogoutUserData(wasSessionDestroyed)
        )
    }

    return new UsersClasses
      .responses
      .LogoutUserResponse(
        usersPayloads.error[UsersSymbols.MUTATION_LOGOUT_ERROR].httpCode,
        usersPayloads.error[UsersSymbols.MUTATION_LOGOUT_ERROR].message,
        usersPayloads.error[UsersSymbols.MUTATION_LOGOUT_ERROR].code,
        req.body.operationName
      )
  }

  @Mutation(() => UsersClasses.responses.ForgotPasswordResponse)
  @UseMiddleware(Anonymous, ValidateArgs(ForgotPasswordArgsSchema))
  async forgotPassword (
    @Arg('data', () => ForgotPasswordInput) data: ForgotPasswordInput,
    @Ctx() { req, redis }: ApplicationContext
  ) {
    try {
      const user = await User.findOne({ where: { email: data.email } })

      if (!user) {
        return new UsersClasses
          .responses
          .ForgotPasswordResponse(
            usersPayloads.success[UsersSymbols.RESET_PASSWORD_EMAIL_SENT].httpCode,
            usersPayloads.success[UsersSymbols.RESET_PASSWORD_EMAIL_SENT].message,
            usersPayloads.success[UsersSymbols.RESET_PASSWORD_EMAIL_SENT].code,
            req.body.operationName,
            new UsersClasses
              .data
              .ForgotPasswordData(true)
          )
      }

      const token = v4()

      await redis.set(
        `${redisPrefixValues[RedisPrefixSymbols.FORGOT_PASSWORD_PREFIX]}${token}`,
        user.id,
        'ex',
        1000 * 60 * 60 * 24 * parseInt(process.env.FORGOT_PASSWORD_TOKEN_EXPIRATION_DAYS || '3')
      )

      const wasEmailSent = await sendHtmlMail(
        user.email,
        `[${user.username}] Reset your password`,
        `<a href=${process.env.CORS_ORIGIN}/change-password/${token}>Click here to reset your password</a>`
      )

      if (wasEmailSent) {
        return new UsersClasses
          .responses
          .ForgotPasswordResponse(
            usersPayloads.success[UsersSymbols.RESET_PASSWORD_EMAIL_SENT].httpCode,
            usersPayloads.success[UsersSymbols.RESET_PASSWORD_EMAIL_SENT].message,
            usersPayloads.success[UsersSymbols.RESET_PASSWORD_EMAIL_SENT].code,
            req.body.operationName,
            new UsersClasses
              .data
              .ForgotPasswordData(wasEmailSent)
          )
      }

      throw new Error('Email was not sent.')
    } catch (e) {
      return new UsersClasses
        .responses
        .ForgotPasswordResponse(
          usersPayloads.error[UsersSymbols.MUTATION_FORGOT_PASSWORD_ERROR].httpCode,
          usersPayloads.error[UsersSymbols.MUTATION_FORGOT_PASSWORD_ERROR].message,
          usersPayloads.error[UsersSymbols.MUTATION_FORGOT_PASSWORD_ERROR].code,
          req.body.operationName
        )
    }
  }

  @Mutation(() => UsersClasses.responses.ChangePasswordResponse)
  @UseMiddleware(Anonymous, ValidateArgs(ChangePasswordArgsSchema))
  async changePassword (
    @Arg('data', () => ChangePasswordInput) data: ChangePasswordInput,
    @Ctx() { db, req, redis }: ApplicationContext
  ) {
    const key = `${redisPrefixValues[RedisPrefixSymbols.FORGOT_PASSWORD_PREFIX]}${data.token}`

    try {
      const userId = await redis.get(key)

      if (!userId) {
        return new UsersClasses
          .responses
          .ChangePasswordResponse(
            usersPayloads.error[UsersSymbols.FORGOT_PASSWORD_TOKEN_NOT_FOUND].httpCode,
            usersPayloads.error[UsersSymbols.FORGOT_PASSWORD_TOKEN_NOT_FOUND].message,
            usersPayloads.error[UsersSymbols.FORGOT_PASSWORD_TOKEN_NOT_FOUND].code,
            req.body.operationName,
            undefined,
            [
              new FieldError(
                'data.token',
                'db.notfound',
                'Token',
                'The recovery password token was not found in the database.'
              )
            ]
          )
      }

      const id = +userId

      const hashedNewPassword = await argon2.hash(data.form.newPassword)

      const { raw: [rawUser], affected } =
        await db
          .createQueryBuilder()
          .update(User)
          .set({ password: hashedNewPassword })
          .where(
            'id = :id',
            { id }
          )
          .returning('*')
          .execute()

      if (affected === 0) {
        return new UsersClasses
          .responses
          .ChangePasswordResponse(
            sharedPayloads.error[SharedSymbols.USER_NOT_FOUND].httpCode,
            sharedPayloads.error[SharedSymbols.USER_NOT_FOUND].message,
            sharedPayloads.error[SharedSymbols.USER_NOT_FOUND].code,
            req.body.operationName,
            undefined,
            [
              new FieldError(
                'etc.id',
                'db.notexists',
                'ID',
                'There is no registered account with this user ID.'
              )
            ]
          )
      }

      const updatedUser = User.create(rawUser as UpdateUserRawEntity)

      await redis.del(key)
      req.session.userId = id

      return new UsersClasses
        .responses
        .ChangePasswordResponse(
          usersPayloads.success[UsersSymbols.USER_PASSWORD_UPDATED].httpCode,
          usersPayloads.success[UsersSymbols.USER_PASSWORD_UPDATED].message,
          usersPayloads.success[UsersSymbols.USER_PASSWORD_UPDATED].code,
          req.body.operationName,
          new UsersClasses
            .data
            .ChangePasswordData(updatedUser)
        )
    } catch (e) {
      return new UsersClasses
        .responses
        .ChangePasswordResponse(
          usersPayloads.error[UsersSymbols.MUTATION_CHANGE_PASSWORD_ERROR].httpCode,
          usersPayloads.error[UsersSymbols.MUTATION_CHANGE_PASSWORD_ERROR].message,
          usersPayloads.error[UsersSymbols.MUTATION_CHANGE_PASSWORD_ERROR].code,
          req.body.operationName
        )
    }
  }
}
