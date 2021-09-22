import DataLoader from 'dataloader'

import Updoot from '../../../../../db/orm/entities/Updoot'
import { DBRawEntities } from '../../../../../types/db'

const byUserId = () => {
  return new DataLoader<number, DBRawEntities.UpdootWithAliasRawEntity[], number>(async (userIds) => {
    try {
      const rawUpdoots: DBRawEntities.UpdootWithAliasRawEntity[] =
        await Updoot
          .getRepository()
          .createQueryBuilder('updoot')
          .where(
            'updoot.userId IN (:...userIds)',
            { userIds }
          )
          .orderBy('updoot.createdAt', 'DESC')
          .getRawMany()

      return userIds.map((userId) => rawUpdoots.filter((rawUpdoot) => rawUpdoot.updoot_userId === userId))
    } catch (e) {
      return [e]
    }
  })
}

export default byUserId
