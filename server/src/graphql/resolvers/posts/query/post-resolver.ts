import { Resolver, Query, Ctx, Arg, UseMiddleware } from 'type-graphql'

import Post from '../../../../db/orm/entities/Post'
import PostInput from '../../../args/inputs/query/posts/post-input'
import FieldError from '../../../objects/responses/error/field-error'
import querySchemas from '../../../args/schemas/query/posts'
import postsResponses from '../../../objects/responses/posts'
import responses from '../../../constants/responses'
import generatedMiddlewares from '../../../../generator/graphql/middleware'
import { GraphQLContext } from '../../../../types/graphql'

@Resolver()
export default class PostResolver {
  @Query(() => postsResponses.query.responses.PostResponse)
  @UseMiddleware(generatedMiddlewares.ValidateArgs(querySchemas.PostArgsSchema))
  async post (
    @Arg('data', () => PostInput) data: PostInput,
    @Ctx() { req }: GraphQLContext.ApplicationContext
  ) {
    try {
      const post = await Post.findOne(data.id)

      if (!post) {
        return new postsResponses
          .query
          .responses
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
        new postsResponses
          .query
          .responses
          .PostResponse(
            responses.payloads.postsPayloads.success[responses.symbols.PostsSymbols.POST_FETCHED].httpCode,
            responses.payloads.postsPayloads.success[responses.symbols.PostsSymbols.POST_FETCHED].message,
            responses.payloads.postsPayloads.success[responses.symbols.PostsSymbols.POST_FETCHED].code,
            req.body.operationName,
            new postsResponses
              .query
              .data
              .PostData(post)
          )

      return response
    } catch (e) {
      if (process.env.LOG_ERRORS === 'true') console.error(e)
      return new postsResponses
        .query
        .responses
        .PostResponse(
          responses.payloads.postsPayloads.error[responses.symbols.PostsSymbols.QUERY_POST_ERROR].httpCode,
          responses.payloads.postsPayloads.error[responses.symbols.PostsSymbols.QUERY_POST_ERROR].message,
          responses.payloads.postsPayloads.error[responses.symbols.PostsSymbols.QUERY_POST_ERROR].code,
          req.body.operationName
        )
    }
  }
}
