const tableName = 'post' as const

const fields = {
  ID: 'id',
  TITLE: 'title',
  TEXT: 'text',
  POINTS: 'points',
  ORIGINAL_POSTER_ID: 'originalPosterId',
  CREATED_AT: 'createdAt',
  UPDATED_AT: 'updatedAt'
} as const

const constants = {
  tableName,
  fields
}

export default constants
