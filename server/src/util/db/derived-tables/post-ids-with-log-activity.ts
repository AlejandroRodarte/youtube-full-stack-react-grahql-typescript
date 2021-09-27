import { SelectQueryBuilder } from 'typeorm'
import PostPointsLog from '../../../db/orm/entities/PostPointsLog'
import entityConstants from '../../../constants/db/orm/entities'

const postIdsWithLogActivity = (oldDate: Date, newDate: Date) => (qb: SelectQueryBuilder<{ postId: number }[]>) =>
  qb
    .select(`${entityConstants.PostPointsLog.tableName}."${entityConstants.PostPointsLog.fields.POST_ID}"`)
    .from(PostPointsLog, entityConstants.PostPointsLog.tableName)
    .where(
      `
        ${entityConstants.PostPointsLog.tableName}."${entityConstants.PostPointsLog.fields.CREATED_AT}"
        BETWEEN :oldDate and :newDate
      `,
      { oldDate, newDate }
    )
    .groupBy(`${entityConstants.PostPointsLog.tableName}."${entityConstants.PostPointsLog.fields.POST_ID}"`)

export default postIdsWithLogActivity
