import { SelectQueryBuilder } from 'typeorm'

import Updoot from './../../../../../db/orm/entities/Updoot'

const trendingScore = (oldDate: Date, newDate: Date) => (qb: SelectQueryBuilder<String>) =>
  qb
    .from(Updoot, 'updoot')
    .select(
    `
      CASE
        WHEN SUM(updoot.value) IS NULL
        THEN 0
        ELSE SUM(updoot.value)
      END
    `
    )
    .where(
      'updoot.postId = post.id AND updoot.updatedAt BETWEEN :oldDate AND :newDate',
      { oldDate, newDate }
    )

export default trendingScore
