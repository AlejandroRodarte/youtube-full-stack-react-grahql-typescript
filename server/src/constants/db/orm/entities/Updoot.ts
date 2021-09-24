const tableName = 'updoot' as const

const fields = {
  USER_ID: 'userId',
  POST_ID: 'postId',
  VALUE: 'value',
  CREATED_AT: 'createdAt',
  UPDATED_AT: 'updatedAt'
} as const

const constants = {
  tableName,
  fields
}

export default constants
