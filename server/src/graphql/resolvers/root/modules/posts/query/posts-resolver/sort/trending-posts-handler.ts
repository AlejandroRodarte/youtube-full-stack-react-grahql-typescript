import { Connection } from 'typeorm'
import { GraphQLArgs } from '../../../../../../../../types/graphql'
import PostDto from '../../../../../../../objects/dtos/posts/post-dto'
import PostsInput from './../../../../../../../args/resolvers/root/modules/posts/query/inputs/posts-input'
import PostsResponse from './../../../../../../../objects/resolvers/modules/posts/query/posts/posts-response'
import constants from '../../../../../../../../constants/graphql'
import utilConstants from '../../../../../../../../constants/util'
import entityConstants from '../../../../../../../../constants/db/orm/entities'
import derivedTables from '../../../../../../../../util/db/derived-tables'
import { DBRawEntities } from '../../../../../../../../types/db'
import generateSuccessResponse from './generate-success-response'

const trendingPostsHandler = async (args: GraphQLArgs.Args<PostsInput>, db: Connection): Promise<PostsResponse> => {
  const { namespace, data } = args

  // data.limit = 10; postsToGo = 11
  let postsToGo = data.limit + 1

  // 1h time window to calculate trend score
  const newDate = new Date()
  const oldDate = new Date(newDate)
  oldDate.setTime(oldDate.getTime() - (1 * 60 * 60 * 1000))

  // utils & constants
  const sortMapper = constants.resolvers.root.modules.posts.sortMapper.trending
  const fromAlias = utilConstants.db.derivedTables.postsWithTrendingScore.aliases.main
  const createdAtField = `${fromAlias}."${entityConstants.Post.fields.CREATED_AT}"`
  const pointsField = `${fromAlias}."${entityConstants.Post.fields.POINTS}"`
  const idField = `${fromAlias}."${entityConstants.Post.fields.ID}"`
  const field = sortMapper.field

  // base query: post table with trending score
  const baseQuery =
    db
      .createQueryBuilder()
      .select('*')
      .from(
        derivedTables.postsWithTrendingScore(oldDate, newDate),
        utilConstants.db.derivedTables.postsWithTrendingScore.aliases.main
      )
      .orderBy(field, 'DESC')
      .addOrderBy(pointsField, 'DESC')
      .addOrderBy(createdAtField, 'DESC')

  /**
   * logic to request 2nd/3rd/nth page
   */
  if (data.cursor) {
    const postDtos: PostDto[] = []
    const [createdAt, points, trendingScore] = sortMapper.cursorParser(data.cursor)

    /**
     * logic to request posts without duplicates
     */
    if (data.ids) {
      /**
       * logic to request posts that got positioned over the cursor between page requests
       */
      if (data.timestamp) {
        const timestampDate = new Date(+data.timestamp)

        // get posts over cursor AND that have been active between page requests
        const newerRawPosts: DBRawEntities.PostWithTrendingScoreRawEntity[] =
          await baseQuery
            .where(
              (qb) => {
                const subQuery =
                  derivedTables
                    .postsIdsWithLogActivity(timestampDate, newDate)(qb.subQuery())
                    .getQuery()

                return `
                  (${idField} IN ${subQuery}) AND
                  (
                    (${field} > :trendingScore) OR
                    (${field} >= :trendingScore AND ${pointsField} > :points) OR
                    (${field} >= :trendingScore AND ${pointsField} >= :points AND ${createdAtField} > :createdAt)
                  )
                `
              },
              { createdAt, points, trendingScore }
            )
            .take(postsToGo)
            .getRawMany()

        // filter only posts that have NOT been sent to client yet
        const newRawPosts = newerRawPosts.filter((rawPost) => !(data.ids && data.ids.includes(rawPost.id)))
        const newPostDtos = PostDto.fromPostWithTrendingScoreRawEntityArray(newRawPosts)

        // postsToGo = 11; newPostDtos.length = 11
        // if 11 new posts have been created, then send them right back
        if (newPostDtos.length === postsToGo) return generateSuccessResponse(newPostDtos, namespace, data.limit)

        // postsToGo = 11; newPostDtos.length = 5
        // push new posts to response array
        postDtos.push(...newPostDtos)

        // postsToGo = 11 - 5 = 6 cursor-based posts to fetch now
        postsToGo = postsToGo - newPostDtos.length
      }

      /**
       * logic to request posts under the cursor without duplicates
       */

      // overfetch posts under the cursor to avoid multiple database trips
      const chunkSize = 2 * (data.limit + 1)

      // db result count for current iteration and cursors
      let resultCount = 0
      let createdAtCursor = createdAt
      let pointsCursor = points
      let trendingScoreCursor = trendingScore

      do {
        // fetch first round of posts
        const rawPosts: DBRawEntities.PostWithTrendingScoreRawEntity[] =
          await baseQuery
            .where(
              `
                (${field} < :trendingScore) OR
                (${field} <= :trendingScore AND ${pointsField} < :points) OR
                (${field} <= :trendingScore AND ${pointsField} <= :points AND ${createdAtField} < :createdAt)
              `,
              { createdAt: createdAtCursor, points: pointsCursor, trendingScore: trendingScoreCursor }
            )
            .take(chunkSize)
            .getRawMany()

        resultCount = rawPosts.length

        // if results were found, set cursors on last post found
        if (resultCount > 0) {
          const lastPost = rawPosts[rawPosts.length - 1]

          createdAtCursor = lastPost.createdAt
          pointsCursor = lastPost.points
          trendingScoreCursor = +lastPost.trendingscore
        }

        // filter db results to only include non-duplicate posts
        const rawPostIds = rawPosts.map((rawPost) => rawPost.id)
        const duplicateIds = data.ids.filter((id) => rawPostIds.includes(id))
        const filteredRawPosts = rawPosts.filter((rawPost) => !duplicateIds.includes(rawPost.id))

        // if quota is met (or overmet), break from loop to send response
        if (filteredRawPosts.length >= postsToGo) {
          const rawPostsToSend = filteredRawPosts.slice(0, postsToGo)
          const rawPostDtosToSend = PostDto.fromPostWithTrendingScoreRawEntityArray(rawPostsToSend)
          postDtos.push(...rawPostDtosToSend)
          break
        }

        // if quota is not met, push elements and reduce quota accordingly
        const filteredPostDtos = PostDto.fromPostWithTrendingScoreRawEntityArray(filteredRawPosts)
        postDtos.push(...filteredPostDtos)
        postsToGo = postsToGo - filteredPostDtos.length
      } while (resultCount !== 0)

      return generateSuccessResponse(postDtos, namespace, data.limit)
    }

    /**
     * logic to request posts under the cursor with (possible) duplicates
     */
    const cursorBasedRawPosts: DBRawEntities.PostWithTrendingScoreRawEntity[] =
      await baseQuery
        .where(
          `
            (${field} < :trendingScore) OR
            (${field} <= :trendingScore AND ${pointsField} < :points) OR
            (${field} <= :trendingScore AND ${pointsField} <= :points AND ${createdAtField} < :createdAt)
          `,
          { createdAt, points, trendingScore }
        )
        .take(postsToGo)
        .getRawMany()

    const cursorBasedPostDtos = PostDto.fromPostWithTrendingScoreRawEntityArray(cursorBasedRawPosts)
    postDtos.push(...cursorBasedPostDtos)
    return generateSuccessResponse(postDtos, namespace, data.limit)
  }

  /**
   * logic to request 1st page
   */
  const posts: DBRawEntities.PostWithTrendingScoreRawEntity[] =
    await baseQuery
      .take(postsToGo)
      .getRawMany()

  const postDtos = PostDto.fromPostWithTrendingScoreRawEntityArray(posts)
  return generateSuccessResponse(postDtos, namespace, data.limit)
}

export default trendingPostsHandler
