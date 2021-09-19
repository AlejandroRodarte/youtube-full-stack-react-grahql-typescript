import Joi from 'joi'

import { GraphQLArgs } from '../../../../../../types/graphql'

import primitive from './primitive'

interface TrendingScoreDataSchemaInterface {
  timestamp: Joi.StringSchema
}

interface TrendingScoreArgsSchemaInterface extends GraphQLArgs.NamespaceSchema {
  data: Joi.ObjectSchema<TrendingScoreDataSchemaInterface>
}

const AddPostDataSchema =
  Joi
    .object<TrendingScoreDataSchemaInterface>()
    .keys({ timestamp: primitive.timestampSchema })

const AddPostArgsSchema =
  Joi
    .object<TrendingScoreArgsSchemaInterface>()
    .keys({ data: AddPostDataSchema })

export default AddPostArgsSchema
