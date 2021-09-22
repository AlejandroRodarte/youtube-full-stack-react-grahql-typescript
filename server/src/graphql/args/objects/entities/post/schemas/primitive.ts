import Joi from 'joi'

import regex from '../../../../../../constants/regex'

const timestampSchema =
  Joi
    .string()
    .required()
    .regex(regex.positiveIntegers)
    .label('Timestamp')
    .messages({
      'string.pattern.base': '"Timestamp" must be a positive integer.'
    })

const primitive = {
  timestampSchema
}

export default primitive
