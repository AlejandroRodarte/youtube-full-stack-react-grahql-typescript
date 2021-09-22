import PostPointsLog from '../../../db/orm/entities/PostPointsLog'
import { TypeORMConnection } from '../../../db/orm/typeorm/connection'

const deleteExpiredPostPointsLogs = setInterval(async () => {
  const newDate = new Date()
  const oldDate = new Date(newDate)

  oldDate.setTime(oldDate.getTime() - (1 * 60 * 60 * 1000))

  try {
    await TypeORMConnection
      .getConnection()
      .createQueryBuilder()
      .delete()
      .from(PostPointsLog, 'post_points_log')
      .where(
        'post_points_log."createdAt" < :oldDate',
        { oldDate }
      )
      .execute()
  } catch (e) {
    if (process.env.LOG_ERRORS === 'true') console.log(e)
  }
}, 2 * 60 * 60 * 1000)

export default deleteExpiredPostPointsLogs
