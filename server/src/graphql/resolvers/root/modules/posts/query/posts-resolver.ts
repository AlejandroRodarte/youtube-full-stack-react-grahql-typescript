import { Resolver, Query, Ctx, UseMiddleware, Arg } from 'type-graphql'

import PostDto from '../../../../../objects/dtos/posts/post-dto'
import PostsInput from './../../../../../args/resolvers/root/modules/posts/query/inputs/posts-input'
import PostsArgsSchema from '../../../../../args/resolvers/root/modules/posts/query/schemas/posts-args-schema'
import objects from '../../../../../objects/resolvers/modules/posts/query/posts'
import constants from '../../../../../../constants/graphql'
import utilConstants from '../../../../../../constants/util'
import entityConstants from '../../../../../../constants/db/orm/entities'
import generatedMiddlewares from '../../../../../../middleware/generator/graphql/resolvers'
import derivedTables from '../../../../../../util/db/derived-tables'
import { GraphQLContext } from '../../../../../../types/graphql'
import { DBRawEntities } from '../../../../../../types/db'

@Resolver()
export default class RootPostsResolver {
  @Query(() => objects.PostsResponse)
  @UseMiddleware(generatedMiddlewares.ValidateArgs(PostsArgsSchema))
  async posts (
    @Arg('namespace', () => String) namespace: string,
    @Ctx() { db }: GraphQLContext.ApplicationContext,
    @Arg('data', () => PostsInput) data: PostsInput
  ) {
    const newDate = new Date(+data.timestamp)
    const oldDate = new Date(newDate)

    oldDate.setTime(oldDate.getTime() - (1 * 60 * 60 * 1000))

    const sortMapper = constants.resolvers.root.modules.posts.sortMapper
    const sortTypes = constants.args.posts.SortTypes

    const fromAlias = utilConstants.db.derivedTables.postsWithTrendingScore.aliases.main

    const createdAtField = `${fromAlias}."${entityConstants.Post.fields.CREATED_AT}"`
    const pointsField = `${fromAlias}."${entityConstants.Post.fields.POINTS}"`
    const idField = `${fromAlias}."${entityConstants.Post.fields.ID}"`

    const field = sortMapper[data.sort].field

    try {
      const query =
        db
          .createQueryBuilder()
          .select('*')
          .from(
            derivedTables.postsWithTrendingScore(oldDate, newDate),
            fromAlias
          )
          .orderBy(field, 'DESC')
          .take(data.limit + 1)

      switch (data.sort) {
        case sortTypes.NEW:
          if (data.cursor) {
            const createdAt = sortMapper[data.sort].cursorParser(data.cursor)

            query.where(
              `${field} < :createdAt`,
              { createdAt }
            )
          }
          break
        case sortTypes.POPULAR:
          query.addOrderBy(createdAtField, 'DESC')

          if (data.cursor) {
            const [createdAt, points] = sortMapper[data.sort].cursorParser(data.cursor)

            if (data.excludeIds) {
              query.where(
                `
                  (
                    (
                      ${field} < :points) OR
                    (
                      ${field} <= :points AND
                      ${createdAtField} < :createdAt
                    )
                  ) AND
                  (
                    ${idField} NOT IN (:...ids)
                  )
                `,
                { points, createdAt, ids: data.excludeIds }
              )
            } else {
              query.where(
                `
                  (
                    ${field} < :points
                  ) OR
                  (
                    ${field} <= :points AND
                    ${createdAtField} < :createdAt
                  )
                `,
                { points, createdAt }
              )
            }
          }
          break
        case sortTypes.TRENDING:
          query
            .addOrderBy(pointsField, 'DESC')
            .addOrderBy(createdAtField, 'DESC')

          if (data.cursor) {
            const [createdAt, points, trendingScore] = sortMapper[data.sort].cursorParser(data.cursor)

            if (data.excludeIds) {
              query.where(
                `
                  (
                    (
                      ${field} < :trendingScore
                    ) OR
                    (
                      ${field} <= :trendingScore AND
                      ${pointsField} < :points
                    ) OR
                    (
                      ${field} <= :trendingScore AND
                      ${pointsField} <= :points AND
                      ${createdAtField} < :createdAt
                    )
                  ) AND
                  (
                    ${idField} NOT IN (:...ids)
                  )
                `,
                { createdAt, points, trendingScore, ids: data.excludeIds }
              )
            } else {
              query.where(
                `
                  (
                    ${field} < :trendingScore
                  ) OR
                  (
                    ${field} <= :trendingScore AND
                    ${pointsField} < :points
                  ) OR
                  (
                    ${field} <= :trendingScore AND
                    ${pointsField} <= :points AND
                    ${createdAtField} < :createdAt
                  )
                `,
                { createdAt, points, trendingScore }
              )
            }
          }
          break
        default:
          break
      }

      const rawPosts: DBRawEntities.PostWithTrendingScoreRawEntity[] = await query.getRawMany()
      const postDtos = PostDto.fromPostWithTrendingScoreRawEntityArray(rawPosts)

      const response =
        new objects
          .PostsResponse(
            constants.responses.payloads.postsPayloads.success[constants.responses.symbols.PostsSymbols.POSTS_FETCHED].httpCode,
            constants.responses.payloads.postsPayloads.success[constants.responses.symbols.PostsSymbols.POSTS_FETCHED].message,
            constants.responses.payloads.postsPayloads.success[constants.responses.symbols.PostsSymbols.POSTS_FETCHED].code,
            namespace,
            new objects.PostsData(
              postDtos.slice(0, data.limit),
              postDtos.length === data.limit + 1
            )
          )

      return response
    } catch (e) {
      if (process.env.LOG_ERRORS === 'true') console.error(e)
      return new objects
        .PostsResponse(
          constants.responses.payloads.postsPayloads.error[constants.responses.symbols.PostsSymbols.QUERY_POSTS_ERROR].httpCode,
          constants.responses.payloads.postsPayloads.error[constants.responses.symbols.PostsSymbols.QUERY_POSTS_ERROR].message,
          constants.responses.payloads.postsPayloads.error[constants.responses.symbols.PostsSymbols.QUERY_POSTS_ERROR].code,
          namespace
        )
    }
  }
}
