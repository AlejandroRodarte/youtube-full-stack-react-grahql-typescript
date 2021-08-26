import login from './login'
import register from './register'
import { UpdateResolver } from '@urql/exchange-graphcache'

const Mutation: {
  [fieldName: string]: UpdateResolver
} = {
  login,
  register
}

export default Mutation
