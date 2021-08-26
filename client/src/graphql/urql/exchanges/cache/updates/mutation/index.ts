import login from './login'
import register from './register'
import logout from './logout'
import { UpdateResolver } from '@urql/exchange-graphcache'

const Mutation: {
  [fieldName: string]: UpdateResolver
} = {
  login,
  register,
  logout
}

export default Mutation
