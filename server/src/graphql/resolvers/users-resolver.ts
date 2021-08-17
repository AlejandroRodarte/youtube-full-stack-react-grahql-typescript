import { Resolver, Arg, Ctx, Mutation } from 'type-graphql'
import argon2 from 'argon2'

import { RegisterUserInput } from '../inputs/users'
import UsersClasses from '../objects/responses/users'
import { ApplicationContext } from '../../types/graphql'
import generateFieldErrors from '../../util/functions/graphql/responses/generate-field-errors'
import { User } from '../../db/orm/entities'

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
      return new UsersClasses.responses.RegisterUserResponse(400, 'There was an error registering the user.', 'MUTATION_REGISTER_ERROR', undefined, [])
    }
  }
}