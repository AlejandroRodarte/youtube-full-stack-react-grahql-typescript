import Joi from 'joi'

const titleSchema =
  Joi
    .string()
    .min(5)
    .max(50)
    .label('Post title')

const postIdSchema =
  Joi
    .number()
    .required()
    .min(1)
    .label('Post ID')

/**
 * addPost() mutation args on posts-resolver.ts
 */

const AddPostDataSchema =
  Joi
    .object()
    .keys({ title: titleSchema.required() })

const AddPostArgsSchema =
  Joi
    .object()
    .keys({ data: AddPostDataSchema })

/**
 * editPost() mutation args on posts-resolver.ts
 */

const EditPostDataSchema =
  Joi
    .object()
    .keys({
      id: postIdSchema,
      fields: Joi
        .object()
        .keys({
          title: titleSchema.optional()
        })
    })

const EditPostArgsSchema =
  Joi
    .object()
    .keys({ data: EditPostDataSchema })

/**
 * deletePost() mutation args on posts-resolver.ts
 */

const DeletePostDataSchema =
  Joi
    .object()
    .keys({
      id: postIdSchema
    })

const DeletePostArgsSchema =
  Joi
    .object()
    .keys({ data: DeletePostDataSchema })

export {
  AddPostArgsSchema,
  EditPostArgsSchema,
  DeletePostArgsSchema
}
