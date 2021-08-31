import { buildSchema } from 'type-graphql'

import resolvers from '../resolvers'
import { GraphQLTuples } from '../../types/graphql'

const createSchema = async (): Promise<GraphQLTuples.CreateSchemaTuple> => {
  try {
    const schema = await buildSchema({
      resolvers,
      validate: false
    })

    return [
      schema,
      undefined
    ]
  } catch (e) {
    return [
      undefined,
      e
    ]
  }
}

export default createSchema
