import DataLoader from 'dataloader'

import Updoot from './../../../../db/orm/entities/Updoot'
import { CacheTypes } from '../../../../types/cache'
import { DBRawEntities } from '../../../../types/db'

const generateTrendingScoreDataLoader = () => {
  return new DataLoader<CacheTypes.PostTrendingScoreDataLoaderKey, DBRawEntities.PostTrendingScoreRawEntity, CacheTypes.PostTrendingScoreDataLoaderKey>(async (keys) => {
    const postIds = keys.map((key) => key.postId)
    const [{ timestamp }] = keys

    const newDate = new Date(+timestamp)
    const oldDate = new Date(newDate)

    oldDate.setTime(oldDate.getTime() - (1 * 60 * 60 * 1000))

    try {
      const scores: DBRawEntities.PostTrendingScoreRawEntity[] =
        await Updoot
          .createQueryBuilder('u')
          .select('u.postId', 'postId')
          .addSelect('SUM(u.value)', 'trendingScore')
          .where(
            'u.updatedAt BETWEEN :oldDate AND :newDate AND u.postId IN (:...postIds)',
            { oldDate, newDate, postIds }
          )
          .groupBy('u.postId')
          .execute()

      const scoresMap: CacheTypes.PostTrendingScoreDataLoaderMap = {}

      scores.forEach((score) => {
        const key = `${score.postId}.${timestamp}`
        scoresMap[key] = score
      })

      return keys.map((key) => {
        if (scoresMap[`${key.postId}.${timestamp}`]) return scoresMap[`${key.postId}.${timestamp}`]
        else return { postId: key.postId, trendingScore: 0 }
      })
    } catch (e) {
      return [e]
    }
  })
}

export default generateTrendingScoreDataLoader
