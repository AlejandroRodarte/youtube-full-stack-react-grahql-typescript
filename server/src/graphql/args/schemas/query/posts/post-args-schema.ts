import Joi from 'joi'

import primitive from './primitive'

interface PostDataSchemaInterface {
  id: Joi.NumberSchema
}

interface PostArgsSchemaInterface {
  data: Joi.ObjectSchema<PostDataSchemaInterface>
}

const PostDataSchema =
  Joi
    .object<PostDataSchemaInterface>()
    .keys({
      id: primitive.postIdSchema
    })

const PostArgsSchema =
  Joi
    .object<PostArgsSchemaInterface>()
    .keys({
      data: PostDataSchema
    })

export default PostArgsSchema
