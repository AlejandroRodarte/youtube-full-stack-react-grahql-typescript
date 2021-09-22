import Joi from 'joi'

const namespaceSchema =
  Joi
    .string()
    .required()

const primitive = {
  namespaceSchema
}

export default primitive
