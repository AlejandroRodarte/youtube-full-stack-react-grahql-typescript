import Joi from 'joi'

import primitive from './primitive'

interface VoteDataSchemaInterface {
  postId: Joi.NumberSchema
  value: Joi.NumberSchema
}

interface VoteArgsSchemaInterface {
  data: Joi.ObjectSchema<VoteDataSchemaInterface>
}

const VoteArgsDataSchema =
  Joi
    .object<VoteDataSchemaInterface>()
    .keys({
      postId: primitive.postIdSchema,
      value: primitive.valueSchema
    })

const VoteArgsSchema =
  Joi
    .object<VoteArgsSchemaInterface>()
    .keys({ data: VoteArgsDataSchema })

export default VoteArgsSchema
