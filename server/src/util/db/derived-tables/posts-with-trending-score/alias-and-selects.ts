const alias = 'post'

const selects = {
  ID: 'post_id',
  TITLE: 'post."title"',
  TEXT: 'post."text"',
  POINTS: 'post."points"',
  ORIGINAL_POSTER_ID: 'post."originalPosterId"',
  CREATED_AT: 'post."createdAt"',
  UDPATED_AT: 'post."udpatedAt"',
  TRENDING_SCORE: 'post."trendingscore"'
}

const aliasAndSelects = {
  alias,
  selects
}

export default aliasAndSelects
