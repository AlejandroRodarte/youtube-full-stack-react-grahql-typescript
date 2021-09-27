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

const newPostsHandler = async (args: GraphQLArgs.Args<PostsInput>, db: Connection): Promise<PostsResponse> => {
  const { namespace, data } = args

  // data.limit = 10; realLimit = 11
  let realLimit = data.limit + 1

  // 1h time window to calculate trend score
  const newDate = new Date()
  const oldDate = new Date(newDate)
  oldDate.setTime(oldDate.getTime() - (1 * 60 * 60 * 1000))

  // utils & constants
  const sortMapper = constants.resolvers.root.modules.posts.sortMapper.new
  const fromAlias = utilConstants.db.derivedTables.postsWithTrendingScore.aliases.main
  const field = sortMapper.field

  // base query (derived table)
  const baseQuery =
    db
      .createQueryBuilder()
      .select('*')
      .from(
        derivedTables.postsWithTrendingScore(oldDate, newDate),
        fromAlias
      )

  const idField = `${fromAlias}."${entityConstants.Post.fields.ID}"`

  // cursor exists: user is requesting second/third/fourth/nth page
  if (data.cursor) {
    const postDtos: PostDto[] = []
    const createdAt = sortMapper.cursorParser(data.cursor)

    // timestamp exists: user send datetime when last page was requested
    if (data.timestamp) {
      const timestampDate = new Date(+data.timestamp)

      // get posts that were created after requesting the last page
      const newRawPosts: DBRawEntities.PostWithTrendingScoreRawEntity[] =
        await baseQuery
          .where(
            !data.ids ? `${field} > :timestampDate` : `${idField} NOT IN (:...ids) AND ${field} > :timestampDate`,
            !data.ids ? { timestampDate } : { timestampDate, ids: data.ids }
          )
          .orderBy(field, 'DESC')
          .take(realLimit)
          .getRawMany()

      const newPostDtos = PostDto.fromPostWithTrendingScoreRawEntityArray(newRawPosts)

      // realLimit = 11; newPostDtos.length = 11
      // if 11 new posts have been created, then send them right back
      if (newPostDtos.length === realLimit) return generateSuccessResponse(newPostDtos, namespace, data.limit)

      // realLimit = 11; newPostDtos.length = 7
      // push new posts to response array
      postDtos.push(...newPostDtos)

      // realLimit = 11 - 7 = 4 cursor-based posts to fetch now
      realLimit = realLimit - newPostDtos.length
    }

    // get 4 cursor-based posts
    const cursorBasedRawPosts: DBRawEntities.PostWithTrendingScoreRawEntity[] =
      await baseQuery
        .where(
          `${field} < :createdAt`,
          { createdAt }
        )
        .orderBy(field, 'DESC')
        .take(realLimit)
        .getRawMany()

    // push cursor-based posts to array
    const cursorBasedPostDtos = PostDto.fromPostWithTrendingScoreRawEntityArray(cursorBasedRawPosts)
    postDtos.push(...cursorBasedPostDtos)

    return generateSuccessResponse(postDtos, namespace, data.limit)
  }

  // no cursor: user is requesting first page, fetch first 10 posts
  const posts: DBRawEntities.PostWithTrendingScoreRawEntity[] =
    await baseQuery
      .orderBy(field, 'DESC')
      .take(realLimit)
      .getRawMany()

  const postDtos = PostDto.fromPostWithTrendingScoreRawEntityArray(posts)
  return generateSuccessResponse(postDtos, namespace, data.limit)
}

export default newPostsHandler
