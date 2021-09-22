import { SelectQueryBuilder } from 'typeorm'
import Post from '../../../../db/orm/entities/Post'
import Updoot from '../../../../db/orm/entities/Updoot'
import { DBRawEntities } from '../../../../types/db'

const postsWithTrendingScore = (oldDate: Date, newDate: Date) => (qb: SelectQueryBuilder<DBRawEntities.PostWithTrendingScoreRawEntity>) =>
  qb
    .from(Post, 'post')
    .select([
      'id',
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
          WHEN SUM(updoot.value) IS NULL
          THEN 0
          ELSE SUM(updoot.value)
        END
      `,
      'trendingscore'
    )
    .leftJoin(
      Updoot,
      'updoot',
      'post.id = updoot."postId" AND updoot."updatedAt" BETWEEN :oldDate AND :newDate',
      { oldDate, newDate }
    )
    .groupBy('post.id')

export default postsWithTrendingScore
