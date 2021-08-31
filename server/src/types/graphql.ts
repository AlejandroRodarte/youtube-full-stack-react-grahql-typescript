import { ApolloServer, ExpressContext } from 'apollo-server-express'
import { Request, Response } from 'express'
import { GraphQLSchema } from 'graphql'
import { Redis } from 'ioredis'
import TypeORM from 'typeorm'

import PostInput from '../graphql/args/inputs/query/posts/post-input'
import AddPostInput from '../graphql/args/inputs/mutation/posts/add-post-input'
import EditPostInput from '../graphql/args/inputs/mutation/posts/edit-post-input'
import DeletePostInput from '../graphql/args/inputs/mutation/posts/delete-post-input'
import RegisterInput from '../graphql/args/inputs/mutation/users/register-input'
import LoginInput from '../graphql/args/inputs/mutation/users/login-input'
import ChangePasswordInput from '../graphql/args/inputs/mutation/users/change-password-input'
import ForgotPasswordInput from '../graphql/args/inputs/mutation/users/forgot-password-input'

export namespace GraphQLTuples {
  export type CreateSchemaTuple = [
    GraphQLSchema | undefined,
    Error | undefined
  ]

  export type CreateApolloServerTuple = [
    ApolloServer<ExpressContext> | undefined,
    Error | undefined
  ]
}

export namespace GraphQLContext {
  export type ApplicationContext = {
    req: Request,
    res: Response,
    db: TypeORM.Connection
    redis: Redis
  }
}

export namespace GraphQLConstants {

  interface ConstraintPayload {
    httpCode: number,
    code: string,
    message: string,
    fieldError: {
      path: string,
      message: string,
      type: string,
      label: string
    }
  }

  export interface Constraints {
    [constraint: string]: ConstraintPayload
  }
}

export namespace GraphQLInputs {

  interface PostInputAction {
    type: 'PostInput'
    payload: PostInput
  }

  interface AddPostInputAction {
    type: 'AddPostInput'
    payload: AddPostInput
  }

  interface EditPostInputAction {
    type: 'EditPostInput'
    payload: EditPostInput
  }

  interface DeletePostInputAction {
    type: 'DeletePostInput'
    payload: DeletePostInput
  }

  interface RegisterInputAction {
    type: 'RegisterInput'
    payload: RegisterInput
  }

  interface LoginInputAction {
    type: 'LoginInput'
    payload: LoginInput
  }

  interface ChangePasswordInputAction {
    type: 'ChangePasswordInput'
    payload: ChangePasswordInput
  }

  interface ForgotPasswordInputAction {
    type: 'ForgotPasswordInput'
    payload: ForgotPasswordInput
  }

  export type InputType =
    'PostInput' |
    'AddPostInput' |
    'EditPostInput' |
    'DeletePostInput' |
    'RegisterInput' |
    'LoginInput' |
    'ChangePasswordInput' |
    'ForgotPasswordInput'

  export type InputPayload =
    PostInput |
    AddPostInput |
    EditPostInput |
    DeletePostInput |
    RegisterInput |
    LoginInput |
    ChangePasswordInput |
    ForgotPasswordInput

  export type InputAction =
    PostInputAction |
    AddPostInputAction |
    EditPostInputAction |
    DeletePostInputAction |
    RegisterInputAction |
    LoginInputAction |
    ChangePasswordInputAction |
    ForgotPasswordInputAction

}
