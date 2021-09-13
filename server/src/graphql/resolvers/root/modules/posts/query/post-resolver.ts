import { Resolver, Query, Ctx, Arg, UseMiddleware } from 'type-graphql'

import Post from '../../../../../../db/orm/entities/Post'
import PostInput from './../../../../../args/resolvers/root/modules/posts/query/inputs/post-input'
import PostArgsSchema from '../../../../../args/resolvers/root/modules/posts/query/schemas/post-args-schema'
import FieldError from '../../../../../objects/common/error/field-error'
import objects from '../../../../../objects/resolvers/modules/posts/query/post'
import responses from '../../../../.././../constants/graphql/responses'
import generatedMiddlewares from '../../../../../../middleware/generator/graphql/resolvers'
import { GraphQLContext } from '../../../../../../types/graphql'

@Resolver()
export default class PostResolver {
  @Query(() => objects.PostResponse)
  @UseMiddleware(generatedMiddlewares.ValidateArgs(PostArgsSchema))
  async post (
    @Arg('data', () => PostInput) data: PostInput,
    @Ctx() { req }: GraphQLContext.ApplicationContext
  ) {
    try {
      const post = await Post.findOne(data.id, { relations: ['originalPoster'] })

      if (!post) {
        return new objects
          .PostResponse(
            responses.payloads.sharedPayloads.error[responses.symbols.SharedSymbols.POST_NOT_FOUND].httpCode,
            responses.payloads.sharedPayloads.error[responses.symbols.SharedSymbols.POST_NOT_FOUND].message,
            responses.payloads.sharedPayloads.error[responses.symbols.SharedSymbols.POST_NOT_FOUND].code,
            req.body.operationName,
            undefined,
            [
              new FieldError(
                'data.id',
                'db.notfound',
                'Post ID',
                'There is no post with that ID.'
              )
            ]
          )
      }

      const response =
        new objects
          .PostResponse(
            responses.payloads.postsPayloads.success[responses.symbols.PostsSymbols.POST_FETCHED].httpCode,
            responses.payloads.postsPayloads.success[responses.symbols.PostsSymbols.POST_FETCHED].message,
            responses.payloads.postsPayloads.success[responses.symbols.PostsSymbols.POST_FETCHED].code,
            req.body.operationName,
            new objects
              .PostData(post)
          )

      return response
    } catch (e) {
      if (process.env.LOG_ERRORS === 'true') console.error(e)
      return new objects
        .PostResponse(
          responses.payloads.postsPayloads.error[responses.symbols.PostsSymbols.QUERY_POST_ERROR].httpCode,
          responses.payloads.postsPayloads.error[responses.symbols.PostsSymbols.QUERY_POST_ERROR].message,
          responses.payloads.postsPayloads.error[responses.symbols.PostsSymbols.QUERY_POST_ERROR].code,
          req.body.operationName
        )
    }
  }
}
