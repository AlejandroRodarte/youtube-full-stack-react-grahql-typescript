import Joi from 'joi'

const postIdSchema =
  Joi
    .number()
    .required()
    .min(1)
    .label('Post ID')

const primitive = {
  postIdSchema
}

export default primitive
