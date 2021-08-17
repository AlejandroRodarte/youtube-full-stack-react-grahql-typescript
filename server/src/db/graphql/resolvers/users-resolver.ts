import { Resolver, Arg, Ctx, Mutation } from 'type-graphql'
import argon2 from 'argon2'

import { RegisterUserInput } from '../inputs/users'
import { ApplicationContext } from '../../../types/db/graphql'
import { User } from '../../orm/entities/User'
import ApplicationErrorResponse from '../error/application-error-response'
import UsersClasses from '../objects/responses/users'

@Resolver()
export default class UserResolver {
  @Mutation(() => UsersClasses.responses.RegisterUserResponse)
  async register (
    @Arg('data', () => RegisterUserInput) data: RegisterUserInput,
    @Ctx() { db }: ApplicationContext
  ) {
    try {
      const hashedPassword = await argon2.hash(data.password)
      const user = db.create(User, {
        username: data.username,
        password: hashedPassword
      })
      await db.persistAndFlush(user)
      const response = new UsersClasses.responses.RegisterUserResponse(201, 'User registered.', new UsersClasses.data.RegisterUserData(user))
      return response
    } catch (e) {
      throw new ApplicationErrorResponse(400, 'There was an error registering the user.', 'REGISTER_USER_ERROR')
    }
  }
}
