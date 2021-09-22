import DataLoader from 'dataloader'

import User from '../../../../../db/orm/entities/User'
import { CacheTypes } from '../../../../../types/cache'

// ids: [1, 78]
// return: [{ id: 1, username: 'tim' }, { id: 78, username: 'alex' }]
// order matters
const byId = () => {
  return new DataLoader<number, User, number>(async (ids) => {
    try {
      const users = await User.findByIds(ids as number[])

      const userMap: CacheTypes.LoaderMap<User> = {}

      users.forEach((user) => {
        userMap[user.id] = user
      })

      return ids.map((id) => userMap[id])
    } catch (e) {
      return [e]
    }
  })
}

export default byId
