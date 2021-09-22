import { Resolver, Arg, Ctx, Mutation, UseMiddleware } from 'type-graphql'
import argon2 from 'argon2'

import User from '../../../../../../db/orm/entities/User'
import ChangePasswordInput from '../../../../../args/resolvers/root/modules/users/mutation/inputs/change-password-input'
import ChangePasswordArgsSchema from '../../../../../args/resolvers/root/modules/users/mutation/schemas/change-password-args-schema'
import FieldError from '../../../../../objects/common/error/field-error'
import objects from '../../../../../objects/resolvers/modules/users/mutation/change-password'
import constants from '../../../../../../constants'
import generatedMiddlewares from '../../../../../../middleware/generator/graphql/resolvers'

import { GraphQLContext } from '../../../../../../types/graphql'
import { DBRawEntities } from '../../../../../../types/db'

@Resolver()
export default class ChangePasswordResolver {
  @Mutation(() => objects.ChangePasswordResponse)
  @UseMiddleware(
    generatedMiddlewares.Anonymous({ isApplicationResponse: true }),
    generatedMiddlewares.ValidateArgs(ChangePasswordArgsSchema)
  )
  async changePassword (
    @Arg('namespace', () => String) namespace: string,
    @Arg('data', () => ChangePasswordInput) data: ChangePasswordInput,
    @Ctx() { db, req, redis }: GraphQLContext.ApplicationContext
  ) {
    const key = `${constants.redis.prefixes.values[constants.redis.prefixes.PrefixSymbols.FORGOT_PASSWORD_PREFIX]}${data.token}`

    try {
      const userId = await redis.get(key)

      if (!userId) {
        return new objects
          .ChangePasswordResponse(
            constants.graphql.responses.payloads.usersPayloads.error[constants.graphql.responses.symbols.UsersSymbols.FORGOT_PASSWORD_TOKEN_NOT_FOUND].httpCode,
            constants.graphql.responses.payloads.usersPayloads.error[constants.graphql.responses.symbols.UsersSymbols.FORGOT_PASSWORD_TOKEN_NOT_FOUND].message,
            constants.graphql.responses.payloads.usersPayloads.error[constants.graphql.responses.symbols.UsersSymbols.FORGOT_PASSWORD_TOKEN_NOT_FOUND].code,
            namespace,
            undefined,
            [
              new FieldError(
                'data.token',
                'db.not-found',
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
        return new objects
          .ChangePasswordResponse(
            constants.graphql.responses.payloads.sharedPayloads.error[constants.graphql.responses.symbols.SharedSymbols.USER_NOT_FOUND].httpCode,
            constants.graphql.responses.payloads.sharedPayloads.error[constants.graphql.responses.symbols.SharedSymbols.USER_NOT_FOUND].message,
            constants.graphql.responses.payloads.sharedPayloads.error[constants.graphql.responses.symbols.SharedSymbols.USER_NOT_FOUND].code,
            namespace,
            undefined,
            [
              new FieldError(
                'etc.user.id',
                'db.not-found',
                'ID',
                'There is no registered account with this user ID.'
              )
            ]
          )
      }

      const updatedUser = User.create(rawUser as DBRawEntities.UpdateUserRawEntity)

      await redis.del(key)
      req.session.userId = id

      return new objects
        .ChangePasswordResponse(
          constants.graphql.responses.payloads.usersPayloads.success[constants.graphql.responses.symbols.UsersSymbols.USER_PASSWORD_UPDATED].httpCode,
          constants.graphql.responses.payloads.usersPayloads.success[constants.graphql.responses.symbols.UsersSymbols.USER_PASSWORD_UPDATED].message,
          constants.graphql.responses.payloads.usersPayloads.success[constants.graphql.responses.symbols.UsersSymbols.USER_PASSWORD_UPDATED].code,
          namespace,
          new objects
            .ChangePasswordData(updatedUser)
        )
    } catch (e) {
      if (process.env.LOG_ERRORS === 'true') console.error(e)
      return new objects
        .ChangePasswordResponse(
          constants.graphql.responses.payloads.usersPayloads.error[constants.graphql.responses.symbols.UsersSymbols.MUTATION_CHANGE_PASSWORD_ERROR].httpCode,
          constants.graphql.responses.payloads.usersPayloads.error[constants.graphql.responses.symbols.UsersSymbols.MUTATION_CHANGE_PASSWORD_ERROR].message,
          constants.graphql.responses.payloads.usersPayloads.error[constants.graphql.responses.symbols.UsersSymbols.MUTATION_CHANGE_PASSWORD_ERROR].code,
          namespace
        )
    }
  }
}
