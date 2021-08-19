import Joi from 'joi'

/**
 * post() query on posts-resolver.ts
 */

const PostIdSchema = Joi.number().required().min(1).label('Post ID')

const PostArgsSchema = Joi.object().keys({
  id: PostIdSchema
})

export { PostArgsSchema }
