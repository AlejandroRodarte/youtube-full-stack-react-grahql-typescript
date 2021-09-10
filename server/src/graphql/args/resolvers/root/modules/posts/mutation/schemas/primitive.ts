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

const textSchema =
  Joi
    .string()
    .min(10)
    .label('Post text')

const primitive = {
  titleSchema,
  postIdSchema,
  textSchema
}

export default primitive
