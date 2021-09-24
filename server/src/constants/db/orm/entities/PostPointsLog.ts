const tableName = 'post_points_log' as const

const fields = {
  ID: 'id',
  POST_ID: 'postId',
  DELTA: 'delta',
  CREATED_AT: 'createdAt'
} as const

const constants = {
  tableName,
  fields
}

export default constants
