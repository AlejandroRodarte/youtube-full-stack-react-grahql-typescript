import Joi from 'joi'

/**
 * addPost() mutation args on posts-resolver.ts
 */

const AddPostDataSchema =
  Joi
    .object()
    .keys({
      title: Joi
        .string()
        .required()
        .min(5)
        .max(50)
        .label('Post title')
    })

const AddPostArgsSchema =
  Joi
    .object()
    .keys({
      data: AddPostDataSchema
    })

/**
 * editPost() mutation args on posts-resolver.ts
 */

const EditPostDataSchema =
  Joi
    .object()
    .keys({
      title: Joi
        .string()
        .optional()
        .min(5)
        .max(50)
        .label('Post title')
    })

const EditPostIdSchema =
  Joi
    .number()
    .required()
    .min(1)
    .label('Post ID')

const EditPostArgsSchema =
  Joi
    .object()
    .keys({
      id: EditPostIdSchema,
      data: EditPostDataSchema
    })

/**
 * deletePost() mutation args on posts-resolver.ts
 */

const DeletePostIdSchema = EditPostIdSchema

const DeletePostArgsSchema =
  Joi
    .object()
    .keys({
      id: DeletePostIdSchema
    })

export {
  AddPostArgsSchema,
  EditPostArgsSchema,
  DeletePostArgsSchema
}
