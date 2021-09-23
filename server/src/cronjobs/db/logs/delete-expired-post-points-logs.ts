import PostPointsLog from '../../../db/orm/entities/PostPointsLog'
import { TypeORMConnection } from '../../../db/orm/typeorm/connection'

const deleteExpiredPostPointsLogs = setInterval(async () => {
  const newDate = new Date()
  const oldDate = new Date(newDate)

  oldDate.setTime(oldDate.getTime() - (1 * 60 * 60 * 1000))

  try {
    const result =
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

    if (process.env.LOG_ERRORS === 'true') {
      console.info(`Deleted ${result.affected} PostPointsLog records.`)
      console.info('Raw SQL: ', result.raw)
    }
  } catch (e) {
    if (process.env.LOG_ERRORS === 'true') console.log(e)
  }
}, 15 * 60 * 1000)

export default deleteExpiredPostPointsLogs
