import Joi from 'joi'

import primitive from './primitive'

interface PostsDataSchemaInterface {
  limit: Joi.NumberSchema
  sort: Joi.StringSchema
  cursor: Joi.AlternativesSchema
}

interface PostArgsSchemaInterface {
  data: Joi.ObjectSchema<PostsDataSchemaInterface>
}

const PostDataSchema =
  Joi
    .object<PostsDataSchemaInterface>()
    .keys({
      limit: primitive.limitSchema,
      sort: primitive.sortSchema,
      cursor: primitive.cursorSchema
    })

const PostsArgsSchema =
  Joi
    .object<PostArgsSchemaInterface>()
    .keys({
      data: PostDataSchema
    })

export default PostsArgsSchema
