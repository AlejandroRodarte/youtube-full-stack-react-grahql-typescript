import DataLoader from 'dataloader'

import { TypeORMConnection } from '../../../../../../db/orm/typeorm/connection'
import derivedTables from '../../../../../../util/db/derived-tables'
import entityConstants from '../../../../../../constants/db/orm/entities'
import derivedTablesConstants from '../../../../../../constants/util/db/derived-tables'
import { CacheTypes } from '../../../../../../types/cache'
import { DBRawEntities } from '../../../../../../types/db'

const byId = () => {
  return new DataLoader<number, DBRawEntities.PostWithTrendingScoreRawEntity, number>(async (ids) => {
    const newDate = new Date()
    const oldDate = new Date(newDate)

    oldDate.setTime(oldDate.getTime() - (1 * 60 * 60 * 1000))

    const fromAlias = derivedTablesConstants.postsWithTrendingScore.aliases.main

    const idField = `${fromAlias}."${entityConstants.Post.fields.ID}"`
    const createdAtField = `${fromAlias}."${entityConstants.Post.fields.CREATED_AT}"`

    try {
      const rawPosts: DBRawEntities.PostWithTrendingScoreRawEntity[] =
        await TypeORMConnection
          .getConnection()
          .createQueryBuilder()
          .select('*')
          .from(
            derivedTables.postsWithTrendingScore(oldDate, newDate),
            fromAlias
          )
          .where(
            `${idField} IN (:...ids)`,
            { ids }
          )
          .orderBy(createdAtField, 'DESC')
          .getRawMany()

      const rawPostsMap: CacheTypes.LoaderMap<DBRawEntities.PostWithTrendingScoreRawEntity> = {}

      rawPosts.forEach((rawPost) => {
        rawPostsMap[rawPost.id] = rawPost
      })

      return ids.map((id) => rawPostsMap[id])
    } catch (e) {
      return [e]
    }
  })
}

export default byId
