import entityConstants from '../../../db/orm/entities'

const aliases = {
  main: 'post',
  joinedTables: {
    POST: 'post',
    POST_POINTS_LOG: 'post_points_log'
  }
} as const

const trendingScoreSelect = `
  CASE
    WHEN SUM(${aliases.joinedTables.POST_POINTS_LOG}."${entityConstants.PostPointsLog.fields.DELTA}") IS NULL
    THEN 0
    ELSE SUM(${aliases.joinedTables.POST_POINTS_LOG}."${entityConstants.PostPointsLog.fields.DELTA}")
  END
`

const additionalSelects = {
  aliases: {
    TRENDING_SCORE: 'trendingscore'
  }
} as const

const postsWithTrendingScore = {
  aliases,
  trendingScoreSelect,
  additionalSelects
}

export default postsWithTrendingScore
