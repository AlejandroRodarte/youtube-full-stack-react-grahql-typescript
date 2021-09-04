import { Resolver, Query, Ctx, UseMiddleware, Arg } from 'type-graphql'

import Post from '../../../../db/orm/entities/Post'
import PostsInput from '../../../args/inputs/query/posts/posts-input'
import postsResponses from '../../../objects/responses/posts'
import querySchemas from '../../../args/schemas/query/posts'
import responses from '../../../constants/responses'
import generatedMiddlewares from '../../../../generator/graphql/middleware'
import constants from '../../constants/posts'
import argsConstants from '../../../constants/args/posts'
import { GraphQLContext } from '../../../../types/graphql'

@Resolver()
export default class PostsResolver {
  @Query(() => postsResponses.query.responses.PostsResponse)
  @UseMiddleware(generatedMiddlewares.ValidateArgs(querySchemas.PostsArgsSchema))
  async posts (
    @Ctx() { req, db }: GraphQLContext.ApplicationContext,
    @Arg('data', () => PostsInput) data: PostsInput
  ) {
    const mapper = constants.sortMapper[data.sort]

    try {
      const query = db
        .getRepository(Post)
        .createQueryBuilder('p')
        .orderBy(`p.${mapper.field}`, 'DESC')
        .take(data.limit)

      if (data.cursor) {
        switch (data.sort) {
          case argsConstants.SortTypes.NEW: {
            const parsedCursor =
              constants
                .sortMapper[data.sort]
                .cursorParser(data.cursor)

            query.where(
              `p.${mapper.field} < :cursor`,
              { cursor: parsedCursor }
            )
          }
            break
          case argsConstants.SortTypes.POPULAR: {
            const parsedCursor =
            constants
              .sortMapper[data.sort]
              .cursorParser(data.cursor)

            query.where(
            `p.${mapper.field} < :cursor`,
            { cursor: parsedCursor }
            )
          }
            break
          default:
            break
        }
      }

      const posts = await query.getMany()

      const response =
        new postsResponses
          .query
          .responses
          .PostsResponse(
            responses.payloads.postsPayloads.success[responses.symbols.PostsSymbols.POSTS_FETCHED].httpCode,
            responses.payloads.postsPayloads.success[responses.symbols.PostsSymbols.POSTS_FETCHED].message,
            responses.payloads.postsPayloads.success[responses.symbols.PostsSymbols.POSTS_FETCHED].code,
            req.body.operationName,
            new postsResponses
              .query
              .data
              .PostsData(posts)
          )

      return response
    } catch (e) {
      if (process.env.LOG_ERRORS === 'true') console.error(e)
      return new postsResponses
        .query
        .responses
        .PostsResponse(
          responses.payloads.postsPayloads.error[responses.symbols.PostsSymbols.QUERY_POSTS_ERROR].httpCode,
          responses.payloads.postsPayloads.error[responses.symbols.PostsSymbols.QUERY_POSTS_ERROR].message,
          responses.payloads.postsPayloads.error[responses.symbols.PostsSymbols.QUERY_POSTS_ERROR].code,
          req.body.operationName
        )
    }
  }
}
