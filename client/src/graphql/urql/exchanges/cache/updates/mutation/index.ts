import login from './login'
import register from './register'
import logout from './logout'
import changePassword from './change-password'
import { UpdateResolver } from '@urql/exchange-graphcache'

const Mutation: {
  [fieldName: string]: UpdateResolver
} = {
  login,
  register,
  logout,
  changePassword
}

export default Mutation
