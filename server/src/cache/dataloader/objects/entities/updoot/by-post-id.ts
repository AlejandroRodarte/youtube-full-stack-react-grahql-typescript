import DataLoader from 'dataloader'

import Updoot from '../../../../../db/orm/entities/Updoot'
import { DBRawEntities } from '../../../../../types/db'

const byPostId = () => {
  return new DataLoader<number, DBRawEntities.UpdootWithAliasRawEntity[], number>(async (postIds) => {
    try {
      const rawUpdoots: DBRawEntities.UpdootWithAliasRawEntity[] =
        await Updoot
          .getRepository()
          .createQueryBuilder('updoot')
          .where(
            'updoot.postId IN (:...postIds)',
            { postIds }
          )
          .orderBy('updoot.createdAt', 'DESC')
          .getRawMany()

      return postIds.map((postId) => rawUpdoots.filter((rawUpdoot) => rawUpdoot.updoot_postId === postId))
    } catch (e) {
      return [e]
    }
  })
}

export default byPostId
