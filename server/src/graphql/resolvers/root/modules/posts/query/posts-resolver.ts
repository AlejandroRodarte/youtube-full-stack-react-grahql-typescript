import { Resolver, Query, Ctx, UseMiddleware, Arg } from 'type-graphql'

import Post from '../../../../../../db/orm/entities/Post'
import PostsInput from './../../../../../args/resolvers/root/modules/posts/query/inputs/posts-input'
import PostsArgsSchema from '../../../../../args/resolvers/root/modules/posts/query/schemas/posts-args-schema'
import objects from '../../../../../objects/resolvers/modules/posts/query/posts'
import constants from '../../../../.././../constants/graphql'
import generatedMiddlewares from '../../../../../../middleware/generator/graphql/resolvers'
import { GraphQLContext } from '../../../../../../types/graphql'

@Resolver()
export default class PostsResolver {
  @Query(() => objects.PostsResponse)
  @UseMiddleware(generatedMiddlewares.ValidateArgs(PostsArgsSchema))
  async posts (
    @Ctx() { req, db }: GraphQLContext.ApplicationContext,
    @Arg('data', () => PostsInput) data: PostsInput
  ) {
    const field = constants.resolvers.root.modules.posts.sortMapper[data.sort].field

    try {
      const query = db
        .getRepository(Post)
        .createQueryBuilder('p')
        .orderBy(`p.${field}`, 'DESC')
        .take(data.limit)

      switch (data.sort) {
        case constants.args.posts.SortTypes.NEW:
          if (data.cursor) {
            const parsedCursor = constants.resolvers.root.modules.posts.sortMapper[data.sort].cursorParser(data.cursor)

            query.where(
              `p.${field} < :cursor`,
              { cursor: parsedCursor }
            )
          }
          break
        case constants.args.posts.SortTypes.POPULAR:
          query.addOrderBy('p.createdAt', 'DESC')

          if (data.cursor) {
            const [createdAt, points] = constants.resolvers.root.modules.posts.sortMapper[data.sort].cursorParser(data.cursor)

            query.where(
              `p.${field} <= :points AND p.createdAt < :createdAt OR p.${field} < :points`,
              { points, createdAt }
            )
          }
          break
        default:
          break
      }

      const posts = await query.getMany()

      const response =
        new objects
          .PostsResponse(
            constants.responses.payloads.postsPayloads.success[constants.responses.symbols.PostsSymbols.POSTS_FETCHED].httpCode,
            constants.responses.payloads.postsPayloads.success[constants.responses.symbols.PostsSymbols.POSTS_FETCHED].message,
            constants.responses.payloads.postsPayloads.success[constants.responses.symbols.PostsSymbols.POSTS_FETCHED].code,
            req.body.operationName,
            new objects
              .PostsData(posts)
          )

      return response
    } catch (e) {
      if (process.env.LOG_ERRORS === 'true') console.error(e)
      return new objects
        .PostsResponse(
          constants.responses.payloads.postsPayloads.error[constants.responses.symbols.PostsSymbols.QUERY_POSTS_ERROR].httpCode,
          constants.responses.payloads.postsPayloads.error[constants.responses.symbols.PostsSymbols.QUERY_POSTS_ERROR].message,
          constants.responses.payloads.postsPayloads.error[constants.responses.symbols.PostsSymbols.QUERY_POSTS_ERROR].code,
          req.body.operationName
        )
    }
  }
}
