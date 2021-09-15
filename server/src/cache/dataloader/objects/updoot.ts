import DataLoader from 'dataloader'

import Updoot from './../../../db/orm/entities/Updoot'
import { CacheTypes } from '../../../types/cache'

// keys: [{ postId: 5, userId: 10 }]
// [{ postId: 5, userId: 10, value: 1 }]
// again, order matters
const generateUpdootDataLoader = () => {
  return new DataLoader<CacheTypes.UpdootDataLoaderKey, Updoot | null, CacheTypes.UpdootDataLoaderKey>(async (keys) => {
    try {
      const updoots = await Updoot.findByIds(keys as CacheTypes.UpdootDataLoaderKey[])
      const updootMap: CacheTypes.UpdootDataLoaderMap = {}

      updoots.forEach((updoot) => {
        const key = `${updoot.userId}.${updoot.postId}`
        updootMap[key] = updoot
      })

      return keys.map((key) => updootMap[`${key.userId}.${key.postId}`])
    } catch (e) {
      return [e]
    }
  })
}

export default generateUpdootDataLoader
