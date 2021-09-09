import { UpdateResolver } from '@urql/exchange-graphcache'

import login from './login'
import register from './register'
import logout from './logout'
import changePassword from './change-password'
import addPost from './add-post'

const Mutation: {
  [fieldName: string]: UpdateResolver
} = {
  login,
  register,
  logout,
  changePassword,
  addPost
}

export default Mutation
