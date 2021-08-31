import { Resolver, Arg, Ctx, Mutation, UseMiddleware } from 'type-graphql'
import { QueryFailedError } from 'typeorm'
import argon2 from 'argon2'

import User from '../../../../db/orm/entities/User'
import RegisterInput from '../../../args/inputs/mutation/users/register-input'
import FieldError from '../../../objects/responses/error/field-error'
import mutationSchemas from '../../../args/schemas/mutation/users'
import usersResponses from '../../../objects/responses/users'
import responses from '../../../constants/responses'
import middlewares from '../../../middleware'
import generatedMiddlewares from '../../../../generator/graphql/middleware'
import { GraphQLContext } from '../../../../types/graphql'

@Resolver()
export default class RegisterResolver {
  @Mutation(() => usersResponses.mutation.responses.RegisterResponse)
  @UseMiddleware(
    middlewares.Anonymous,
    generatedMiddlewares.ValidateArgs(mutationSchemas.RegisterArgsSchema)
  )
  async register (
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
        new usersResponses
          .mutation
          .responses
          .RegisterResponse(
            responses.payloads.usersPayloads.success[responses.symbols.UsersSymbols.USER_REGISTERED].httpCode,
            responses.payloads.usersPayloads.success[responses.symbols.UsersSymbols.USER_REGISTERED].message,
            responses.payloads.usersPayloads.success[responses.symbols.UsersSymbols.USER_REGISTERED].code,
            req.body.operationName,
            new usersResponses
              .mutation
              .data
              .RegisterData(user)
          )

      return response
    } catch (e) {
      if (e instanceof QueryFailedError && e.constraint) {
        return new usersResponses
          .mutation
          .responses
          .RegisterResponse(
            responses.payloads.constraintPayloads[e.constraint].httpCode,
            responses.payloads.constraintPayloads[e.constraint].message,
            responses.payloads.constraintPayloads[e.constraint].code,
            req.body.operationName,
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

      return new usersResponses
        .mutation
        .responses
        .RegisterResponse(
          responses.payloads.usersPayloads.error[responses.symbols.UsersSymbols.MUTATION_REGISTER_ERROR].httpCode,
          responses.payloads.usersPayloads.error[responses.symbols.UsersSymbols.MUTATION_REGISTER_ERROR].message,
          responses.payloads.usersPayloads.error[responses.symbols.UsersSymbols.MUTATION_REGISTER_ERROR].code,
          req.body.operationName
        )
    }
  }
}
