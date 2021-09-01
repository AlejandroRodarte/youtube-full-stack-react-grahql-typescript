import { Resolver, Arg, Ctx, Mutation, UseMiddleware } from 'type-graphql'
import argon2 from 'argon2'

import User from '../../../../db/orm/entities/User'
import ChangePasswordInput from '../../../args/inputs/mutation/users/change-password-input'
import FieldError from '../../../objects/responses/error/field-error'
import mutationSchemas from '../../../args/schemas/mutation/users'
import usersResponses from '../../../objects/responses/users'
import responses from '../../../constants/responses'
import redisData from '../../../../redis'
import middlewares from '../../../middleware'
import generatedMiddlewares from '../../../../generator/graphql/middleware'
import { GraphQLContext } from '../../../../types/graphql'
import { DBRawEntities } from '../../../../types/db'

@Resolver()
export default class ChangePasswordResolver {
  @Mutation(() => usersResponses.mutation.responses.ChangePasswordResponse)
  @UseMiddleware(
    middlewares.Anonymous,
    generatedMiddlewares.ValidateArgs(mutationSchemas.ChangePasswordArgsSchema)
  )
  async changePassword (
    @Arg('data', () => ChangePasswordInput) data: ChangePasswordInput,
    @Ctx() { db, req, redis }: GraphQLContext.ApplicationContext
  ) {
    const key = `${redisData.constants.prefixes.values[redisData.constants.prefixes.PrefixSymbols.FORGOT_PASSWORD_PREFIX]}${data.token}`

    try {
      const userId = await redis.get(key)

      if (!userId) {
        return new usersResponses
          .mutation
          .responses
          .ChangePasswordResponse(
            responses.payloads.usersPayloads.error[responses.symbols.UsersSymbols.FORGOT_PASSWORD_TOKEN_NOT_FOUND].httpCode,
            responses.payloads.usersPayloads.error[responses.symbols.UsersSymbols.FORGOT_PASSWORD_TOKEN_NOT_FOUND].message,
            responses.payloads.usersPayloads.error[responses.symbols.UsersSymbols.FORGOT_PASSWORD_TOKEN_NOT_FOUND].code,
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
        return new usersResponses
          .mutation
          .responses
          .ChangePasswordResponse(
            responses.payloads.sharedPayloads.error[responses.symbols.SharedSymbols.USER_NOT_FOUND].httpCode,
            responses.payloads.sharedPayloads.error[responses.symbols.SharedSymbols.USER_NOT_FOUND].message,
            responses.payloads.sharedPayloads.error[responses.symbols.SharedSymbols.USER_NOT_FOUND].code,
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

      const updatedUser = User.create(rawUser as DBRawEntities.UpdateUserRawEntity)

      await redis.del(key)
      req.session.userId = id

      return new usersResponses
        .mutation
        .responses
        .ChangePasswordResponse(
          responses.payloads.usersPayloads.success[responses.symbols.UsersSymbols.USER_PASSWORD_UPDATED].httpCode,
          responses.payloads.usersPayloads.success[responses.symbols.UsersSymbols.USER_PASSWORD_UPDATED].message,
          responses.payloads.usersPayloads.success[responses.symbols.UsersSymbols.USER_PASSWORD_UPDATED].code,
          req.body.operationName,
          new usersResponses
            .mutation
            .data
            .ChangePasswordData(updatedUser)
        )
    } catch (e) {
      return new usersResponses
        .mutation
        .responses
        .ChangePasswordResponse(
          responses.payloads.usersPayloads.error[responses.symbols.UsersSymbols.MUTATION_CHANGE_PASSWORD_ERROR].httpCode,
          responses.payloads.usersPayloads.error[responses.symbols.UsersSymbols.MUTATION_CHANGE_PASSWORD_ERROR].message,
          responses.payloads.usersPayloads.error[responses.symbols.UsersSymbols.MUTATION_CHANGE_PASSWORD_ERROR].code,
          req.body.operationName
        )
    }
  }
}
