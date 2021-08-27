import Joi from 'joi'

const postIdSchema =
  Joi
    .number()
    .required()
    .min(1)
    .label('Post ID')

/**
 * post() query on posts-resolver.ts
 */

const PostDataSchema =
  Joi
    .object()
    .keys({
      id: postIdSchema
    })

const PostArgsSchema =
  Joi
    .object()
    .keys({
      data: PostDataSchema
    })

export {
  PostArgsSchema
}
