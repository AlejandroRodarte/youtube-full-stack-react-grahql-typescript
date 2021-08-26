import login from './login'
import { UpdateResolver } from '@urql/exchange-graphcache'

const Mutation: {
  [fieldName: string]: UpdateResolver
} = {
  login
}

export default Mutation
