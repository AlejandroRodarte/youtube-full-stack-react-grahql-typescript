import { Resolver, Arg, Ctx, Mutation, UseMiddleware } from 'type-graphql'
import { QueryFailedError } from 'typeorm'
import argon2 from 'argon2'

import User from '../../../../../../db/orm/entities/User'
import RegisterInput from '../../../../../args/resolvers/root/modules/users/mutation/inputs/register-input'
import RegisterArgsSchema from '../../../../../args/resolvers/root/modules/users/mutation/schemas/register-args-schema'
import FieldError from '../../../../../objects/common/error/field-error'
import objects from '../../../../../objects/resolvers/modules/users/mutation/register'
import responses from '../../../../../../constants/graphql/responses'
import generatedMiddlewares from '../../../../../../middleware/generator/graphql/resolvers'
import { GraphQLContext } from '../../../../../../types/graphql'

@Resolver()
export default class RegisterResolver {
  @Mutation(() => objects.RegisterResponse)
  @UseMiddleware(
    generatedMiddlewares.Anonymous({ isApplicationResponse: true }),
    generatedMiddlewares.ValidateArgs(RegisterArgsSchema)
  )
  async register (
    @Arg('namespace', () => String) namespace: string,
    @Arg('data', () => RegisterInput) data: RegisterInput,
    @Ctx() { req }: GraphQLContext.ApplicationContext
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
        new objects
          .RegisterResponse(
            responses.payloads.usersPayloads.success[responses.symbols.UsersSymbols.USER_REGISTERED].httpCode,
            responses.payloads.usersPayloads.success[responses.symbols.UsersSymbols.USER_REGISTERED].message,
            responses.payloads.usersPayloads.success[responses.symbols.UsersSymbols.USER_REGISTERED].code,
            namespace,
            new objects
              .RegisterData(user)
          )

      return response
    } catch (e) {
      if (process.env.LOG_ERRORS === 'true') console.error(e)
      if (e instanceof QueryFailedError && e.constraint) {
        return new objects
          .RegisterResponse(
            responses.payloads.constraintPayloads[e.constraint].httpCode,
            responses.payloads.constraintPayloads[e.constraint].message,
            responses.payloads.constraintPayloads[e.constraint].code,
            namespace,
            undefined,
            [
              new FieldError(
                responses.payloads.constraintPayloads[e.constraint].fieldError.path,
                responses.payloads.constraintPayloads[e.constraint].fieldError.type,
                responses.payloads.constraintPayloads[e.constraint].fieldError.label,
                responses.payloads.constraintPayloads[e.constraint].fieldError.message
              )
            ]
          )
      }

      return new objects
        .RegisterResponse(
          responses.payloads.usersPayloads.error[responses.symbols.UsersSymbols.MUTATION_REGISTER_ERROR].httpCode,
          responses.payloads.usersPayloads.error[responses.symbols.UsersSymbols.MUTATION_REGISTER_ERROR].message,
          responses.payloads.usersPayloads.error[responses.symbols.UsersSymbols.MUTATION_REGISTER_ERROR].code,
          namespace
        )
    }
  }
}
