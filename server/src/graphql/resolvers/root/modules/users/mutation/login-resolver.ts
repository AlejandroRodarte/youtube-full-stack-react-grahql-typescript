import { Resolver, Arg, Ctx, Mutation, UseMiddleware } from 'type-graphql'
import argon2 from 'argon2'

import User from '../../../../../../db/orm/entities/User'
import UserDto from '../../../../../objects/dtos/users/user-dto'
import LoginInput from '../../../../../args/resolvers/root/modules/users/mutation/inputs/login-input'
import LoginArgsSchema from '../../../../../args/resolvers/root/modules/users/mutation/schemas/login-args-schema'
import FieldError from '../../../../../objects/common/error/field-error'
import objects from '../../../../../objects/resolvers/modules/users/mutation/login'
import responses from '../../../../../../constants/graphql/responses'
import generatedMiddlewares from '../../../../../../middleware/generator/graphql/resolvers'
import { GraphQLContext } from '../../../../../../types/graphql'

@Resolver()
export default class RootLoginResolver {
  @Mutation(() => objects.LoginResponse)
  @UseMiddleware(
    generatedMiddlewares.Anonymous({ isApplicationResponse: true }),
    generatedMiddlewares.ValidateArgs(LoginArgsSchema)
  )
  async login (
    @Arg('namespace', () => String) namespace: string,
    @Arg('data', () => LoginInput) data: LoginInput,
    @Ctx() { req }: GraphQLContext.ApplicationContext
  ) {
    const key = data.credential.includes('@') ? 'email' : 'username'

    const labelMap = {
      email: 'Email',
      username: 'Username'
    }

    try {
      const user = await User.findOne({ where: { [key]: data.credential } })

      if (!user) {
        return new objects
          .LoginResponse(
            responses.payloads.sharedPayloads.error[responses.symbols.SharedSymbols.USER_NOT_FOUND].httpCode,
            responses.payloads.sharedPayloads.error[responses.symbols.SharedSymbols.USER_NOT_FOUND].message,
            responses.payloads.sharedPayloads.error[responses.symbols.SharedSymbols.USER_NOT_FOUND].code,
            namespace,
            undefined,
            [
              new FieldError(
                'data.credential',
                'db.not-found',
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
        return new objects
          .LoginResponse(
            responses.payloads.usersPayloads.error[responses.symbols.UsersSymbols.INCORRECT_PASSWORD].httpCode,
            responses.payloads.usersPayloads.error[responses.symbols.UsersSymbols.INCORRECT_PASSWORD].message,
            responses.payloads.usersPayloads.error[responses.symbols.UsersSymbols.INCORRECT_PASSWORD].code,
            namespace,
            undefined,
            [
              new FieldError(
                'data.password',
                'server.wrong-password',
                'Password',
                'The password is wrong.')
            ]
          )
      }

      const userDto = UserDto.fromUserEntity(user)
      req.session.userId = user.id

      return new objects
        .LoginResponse(
          responses.payloads.usersPayloads.success[responses.symbols.UsersSymbols.USER_LOGGED_IN].httpCode,
          responses.payloads.usersPayloads.success[responses.symbols.UsersSymbols.USER_LOGGED_IN].message,
          responses.payloads.usersPayloads.success[responses.symbols.UsersSymbols.USER_LOGGED_IN].code,
          namespace,
          new objects.LoginData(userDto)
        )
    } catch (e) {
      if (process.env.LOG_ERRORS === 'true') console.error(e)
      return new objects
        .LoginResponse(
          responses.payloads.usersPayloads.error[responses.symbols.UsersSymbols.MUTATION_LOGIN_ERROR].httpCode,
          responses.payloads.usersPayloads.error[responses.symbols.UsersSymbols.MUTATION_LOGIN_ERROR].message,
          responses.payloads.usersPayloads.error[responses.symbols.UsersSymbols.MUTATION_LOGIN_ERROR].code,
          namespace
        )
    }
  }
}
