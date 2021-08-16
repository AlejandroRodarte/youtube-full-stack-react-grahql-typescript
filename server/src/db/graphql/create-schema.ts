import { buildSchema } from 'type-graphql'

import resolvers from './resolvers'
import { CreateSchemaTuple } from '../../types/db/graphql'

const createSchema = async (): Promise<CreateSchemaTuple> => {
  try {
    const schema = await buildSchema({
      resolvers
    })
    return [schema, undefined]
  } catch (e) {
    return [undefined, e]
  }
}

export default createSchema
