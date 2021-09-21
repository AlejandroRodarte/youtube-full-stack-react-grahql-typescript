import DataLoader from 'dataloader'

import { TypeORMConnection } from '../../../../../../db/orm/typeorm/connection'
import derivedTables from '../../../../../../util/db/derived-tables'
import { DBRawEntities } from '../../../../../../types/db'

const byOriginalPosterId = () => {
  return new DataLoader<number, DBRawEntities.PostWithTrendingScoreRawEntity[], number>(async (originalPosterIds) => {
    const newDate = new Date()
    const oldDate = new Date(newDate)

    oldDate.setTime(oldDate.getTime() - (1 * 60 * 60 * 1000))

    const originalPosterIdField = derivedTables.postsWithTrendingScore.aliasAndSelects.selects.ORIGINAL_POSTER_ID
    const createdAtField = derivedTables.postsWithTrendingScore.aliasAndSelects.selects.CREATED_AT

    try {
      const rawPosts: DBRawEntities.PostWithTrendingScoreRawEntity[] =
        await TypeORMConnection
          .getConnection()
          .createQueryBuilder()
          .select('*')
          .from(
            derivedTables.postsWithTrendingScore.query(oldDate, newDate),
            derivedTables.postsWithTrendingScore.aliasAndSelects.alias
          )
          .where(
            `${originalPosterIdField} IN (:...originalPosterIds)`,
            { originalPosterIds }
          )
          .orderBy(createdAtField, 'DESC')
          .getRawMany()

      return originalPosterIds.map((originalPosterId) => rawPosts.filter((rawPost) => rawPost.originalPosterId === originalPosterId))
    } catch (e) {
      return [e]
    }
  })
}

export default byOriginalPosterId
