const tableName = 'user' as const

const fields = {
  ID: 'id',
  USERNAME: 'username',
  EMAIL: 'email',
  PASSWORD: 'password',
  CREATED_AT: 'createdAt',
  UPDATED_AT: 'updatedAt'
} as const

const constants = {
  tableName,
  fields
}

export default constants
