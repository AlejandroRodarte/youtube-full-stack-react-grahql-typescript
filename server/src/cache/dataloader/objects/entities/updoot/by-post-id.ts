import DataLoader from 'dataloader'

import Updoot from '../../../../../db/orm/entities/Updoot'
import entityConstants from '../../../../../constants/db/orm/entities'
import { DBRawEntities } from '../../../../../types/db'

const alias = 'updoot'

const byPostId = () => {
  return new DataLoader<number, DBRawEntities.UpdootWithAliasRawEntity[], number>(async (postIds) => {
    try {
      const rawUpdoots: DBRawEntities.UpdootWithAliasRawEntity[] =
        await Updoot
          .getRepository()
          .createQueryBuilder(alias)
          .where(
            `${alias}."${entityConstants.Updoot.fields.POST_ID}" IN (:...postIds)`,
            { postIds }
          )
          .orderBy(`${alias}."${entityConstants.Updoot.fields.CREATED_AT}"`, 'DESC')
          .getRawMany()

      return postIds.map((postId) => rawUpdoots.filter((rawUpdoot) => rawUpdoot.updoot_postId === postId))
    } catch (e) {
      return [e]
    }
  })
}

export default byPostId
