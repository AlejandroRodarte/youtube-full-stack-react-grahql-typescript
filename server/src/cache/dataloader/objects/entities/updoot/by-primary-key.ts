import DataLoader from 'dataloader'

import Updoot from './../../../../../db/orm/entities/Updoot'
import { CacheTypes } from '../../../../../types/cache'

const byPrimaryKey = () => {
  return new DataLoader<CacheTypes.UpdootPrimaryKey, Updoot | null, CacheTypes.UpdootPrimaryKey>(async (keys) => {
    try {
      const updoots = await Updoot.findByIds(keys as CacheTypes.UpdootPrimaryKey[])

      const updootMap: CacheTypes.LoaderMap<Updoot> = {}

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

export default byPrimaryKey
