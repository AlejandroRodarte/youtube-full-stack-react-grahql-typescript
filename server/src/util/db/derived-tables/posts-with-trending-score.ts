import { SelectQueryBuilder } from 'typeorm'
import Post from '../../../db/orm/entities/Post'
import PostPointsLog from '../../../db/orm/entities/PostPointsLog'
import entityConstants from '../../../constants/db/orm/entities'
import derivedTableConstants from '../../../constants/util/db/derived-tables/posts-with-trending-score'
import { DBRawEntities } from '../../../types/db'

const postsWithTrendingScore = (oldDate: Date, newDate: Date) => (qb: SelectQueryBuilder<DBRawEntities.PostWithTrendingScoreRawEntity>) =>
  qb
    .from(Post, derivedTableConstants.aliases.joinedTables.POST)
    .select([
      `${derivedTableConstants.aliases.joinedTables.POST}."${entityConstants.Post.fields.ID}"`,
      `"${entityConstants.Post.fields.TITLE}"`,
      `"${entityConstants.Post.fields.TEXT}"`,
      `"${entityConstants.Post.fields.POINTS}"`,
      `"${entityConstants.Post.fields.ORIGINAL_POSTER_ID}"`,
      `${derivedTableConstants.aliases.joinedTables.POST}."${entityConstants.Post.fields.CREATED_AT}"`,
      `"${entityConstants.Post.fields.UPDATED_AT}"`
    ])
    .addSelect(
      derivedTableConstants.trendingScoreSelect,
      derivedTableConstants.additionalSelects.aliases.TRENDING_SCORE
    )
    .leftJoin(
      PostPointsLog,
      derivedTableConstants.aliases.joinedTables.POST_POINTS_LOG,
      `
        ${derivedTableConstants.aliases.joinedTables.POST}."${entityConstants.Post.fields.ID}"
        = ${derivedTableConstants.aliases.joinedTables.POST_POINTS_LOG}."${entityConstants.PostPointsLog.fields.POST_ID}"
        AND ${derivedTableConstants.aliases.joinedTables.POST_POINTS_LOG}."${entityConstants.PostPointsLog.fields.CREATED_AT}"
        BETWEEN :oldDate AND :newDate
      `,
      { oldDate, newDate }
    )
    .groupBy(`${derivedTableConstants.aliases.joinedTables.POST}."${entityConstants.Post.fields.ID}"`)

export default postsWithTrendingScore
