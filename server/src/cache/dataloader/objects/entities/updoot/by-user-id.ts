import DataLoader from 'dataloader'

import Updoot from '../../../../../db/orm/entities/Updoot'
import entityConstants from '../../../../../constants/db/orm/entities'
import { DBRawEntities } from '../../../../../types/db'

const alias = 'updoot'

const byUserId = () => {
  return new DataLoader<number, DBRawEntities.UpdootWithAliasRawEntity[], number>(async (userIds) => {
    try {
      const rawUpdoots: DBRawEntities.UpdootWithAliasRawEntity[] =
        await Updoot
          .getRepository()
          .createQueryBuilder(alias)
          .where(
            `${alias}."${entityConstants.Updoot.fields.USER_ID}" IN (:...userIds)`,
            { userIds }
          )
          .orderBy(`${alias}."${entityConstants.Updoot.fields.CREATED_AT}"`, 'DESC')
          .getRawMany()

      return userIds.map((userId) => rawUpdoots.filter((rawUpdoot) => rawUpdoot.updoot_userId === userId))
    } catch (e) {
      return [e]
    }
  })
}

export default byUserId
