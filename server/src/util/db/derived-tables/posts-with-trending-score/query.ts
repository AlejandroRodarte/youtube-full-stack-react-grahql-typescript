import { SelectQueryBuilder } from 'typeorm'
import Post from '../../../../db/orm/entities/Post'
import PostPointsLog from '../../../../db/orm/entities/PostPointsLog'
import { DBRawEntities } from '../../../../types/db'

const postsWithTrendingScore = (oldDate: Date, newDate: Date) => (qb: SelectQueryBuilder<DBRawEntities.PostWithTrendingScoreRawEntity>) =>
  qb
    .from(Post, 'post')
    .select([
      'post.id',
      'title',
      'text',
      'points',
      '"originalPosterId"',
      'post."createdAt"',
      'post."updatedAt"'
    ])
    .addSelect(
      `
        CASE
          WHEN SUM(post_points_log.delta) IS NULL
          THEN 0
          ELSE SUM(post_points_log.delta)
        END
      `,
      'trendingscore'
    )
    .leftJoin(
      PostPointsLog,
      'post_points_log',
      'post.id = post_points_log."postId" AND post_points_log."createdAt" BETWEEN :oldDate AND :newDate',
      { oldDate, newDate }
    )
    .groupBy('post.id')

export default postsWithTrendingScore
