import { ApolloServer, ExpressContext } from 'apollo-server-express'
import { Request, Response } from 'express'
import { GraphQLSchema } from 'graphql'
import { Redis } from 'ioredis'
import TypeORM from 'typeorm'
import Joi from 'joi'
import DataLoader from 'dataloader'

import Updoot from './../db/orm/entities/Updoot'
import User from './../db/orm/entities/User'

import PostInput from '../graphql/args/resolvers/root/modules/posts/query/inputs/post-input'
import PostsInput from '../graphql/args/resolvers/root/modules/posts/query/inputs/posts-input'
import AddPostInput from '../graphql/args/resolvers/root/modules/posts/mutation/inputs/add-post-input'
import EditPostInput from '../graphql/args/resolvers/root/modules/posts/mutation/inputs/edit-post-input'
import DeletePostInput from '../graphql/args/resolvers/root/modules/posts/mutation/inputs/delete-post-input'
import RegisterInput from '../graphql/args/resolvers/root/modules/users/mutation/inputs/register-input'
import LoginInput from '../graphql/args/resolvers/root/modules/users/mutation/inputs/login-input'
import ChangePasswordInput from '../graphql/args/resolvers/root/modules/users/mutation/inputs/change-password-input'
import ForgotPasswordInput from '../graphql/args/resolvers/root/modules/users/mutation/inputs/forgot-password-input'
import VoteInput from '../graphql/args/resolvers/root/modules/updoots/mutation/inputs/vote-input'
import TrendingScoreInput from '../graphql/args/objects/entities/post/inputs/trending-score-input'

import argsConstants from '../constants/graphql/args'
import { CacheTypes } from './cache'
import { DBRawEntities } from './db'

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
  interface PostWithTrendingScoreEntityLoaders {
    byId: DataLoader<number, DBRawEntities.PostWithTrendingScoreRawEntity, number>
    byOriginalPosterId: DataLoader<number, DBRawEntities.PostWithTrendingScoreRawEntity[], number>
  }

  interface PostEntityLoaders {
    withTrendingScore: PostWithTrendingScoreEntityLoaders
  }

  interface UpdootEntityLoaders {
    byPostId: DataLoader<number, DBRawEntities.UpdootWithAliasRawEntity[], number>
    byUserId: DataLoader<number, DBRawEntities.UpdootWithAliasRawEntity[], number>
    byPrimaryKey: DataLoader<CacheTypes.UpdootPrimaryKey, Updoot | null, CacheTypes.UpdootPrimaryKey>
  }

  interface UserEntityLoaders {
    byId: DataLoader<number, User, number>
  }

  interface EntityLoaders {
    post: PostEntityLoaders
    updoot: UpdootEntityLoaders
    user: UserEntityLoaders
  }

  interface ObjectLoaders {
    entities: EntityLoaders
  }

  interface DataLoaderContext {
    objects: ObjectLoaders
  }

  export type ApplicationContext = {
    req: Request,
    res: Response,
    db: TypeORM.Connection
    redis: Redis
    dataloader: DataLoaderContext
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

  export type ConstraintNames =
    'user_email_unique' |
    'user_username_unique' |
    'updoot_post_postId_id'

  export type Constraints = {
    // eslint-disable-next-line no-unused-vars
    [constraint in ConstraintNames]: ConstraintPayload
  }
}

export namespace GraphQLInputs {

  interface PostInputAction {
    type: 'PostInput'
    payload: PostInput
  }

  interface PostsInputAction {
    type: 'PostsInput'
    payload: PostsInput
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

  interface VoteInputAction {
    type: 'VoteInput'
    payload: VoteInput
  }

  interface TrendingScoreInputAction {
    type: 'TrendingScoreInput'
    payload: TrendingScoreInput
  }

  export type InputType =
    'PostInput' |
    'PostsInput' |
    'AddPostInput' |
    'EditPostInput' |
    'DeletePostInput' |
    'RegisterInput' |
    'LoginInput' |
    'ChangePasswordInput' |
    'ForgotPasswordInput' |
    'VoteInput' |
    'TrendingScoreInput'

  export type InputPayload =
    PostInput |
    PostsInput |
    AddPostInput |
    EditPostInput |
    DeletePostInput |
    RegisterInput |
    LoginInput |
    ChangePasswordInput |
    ForgotPasswordInput |
    VoteInput |
    TrendingScoreInput

  export type InputAction =
    PostInputAction |
    PostsInputAction |
    AddPostInputAction |
    EditPostInputAction |
    DeletePostInputAction |
    RegisterInputAction |
    LoginInputAction |
    ChangePasswordInputAction |
    ForgotPasswordInputAction |
    VoteInputAction |
    TrendingScoreInputAction

  export type ExpressInputFields = 'input' | 'posts/canMutatePost'
}

export namespace GraphQLResolverConstants {
  export type PostsSortMapper = {
    [argsConstants.posts.SortTypes.NEW]: {
      field: string,
      cursorParser: (cursor: string) => Date
    },
    [argsConstants.posts.SortTypes.POPULAR]: {
      field: string,
      cursorParser: (cursor: string) => [Date, number]
    },
    [argsConstants.posts.SortTypes.TRENDING]: {
      field: string,
      cursorParser: (cursor: string) => [Date, number, number]
    }
  }
}

export namespace GraphQLArgs {
  export interface NamespaceSchema {
    namespace: Joi.StringSchema
  }

  export type Args<T> = {
    namespace: string
    data: T
  }
}
