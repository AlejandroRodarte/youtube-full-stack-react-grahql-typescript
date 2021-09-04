import Joi from 'joi'

import * as SortTypes from '../../../../constants/args/posts/sort'
import regex from '../../../../../constants/regex'

const postIdSchema =
  Joi
    .number()
    .required()
    .min(1)
    .label('Post ID')

const limitSchema =
  Joi
    .number()
    .required()
    .min(1)
    .max(50)
    .label('Posts limit')

const baseCursorSchema =
  Joi
    .string()
    .optional()
    .label('Posts cursor')

const sortSchema =
  Joi
    .string()
    .required()
    .valid(
      SortTypes.NEW,
      SortTypes.POPULAR
    )
    .label('Posts sorting type')

const cursorSchema =
  Joi
    .alternatives()
    .conditional(
      'sort',
      [
        {
          is: SortTypes.NEW,
          then: baseCursorSchema
            .regex(regex.positiveIntegers)
            .messages({
              'string.pattern.base': '"Posts cursor" must be a positive integer.'
            })
        },
        {
          is: SortTypes.POPULAR,
          then: baseCursorSchema
            .regex(regex.positiveOrNegativeIntegers)
            .messages({
              'string.pattern.base': '"Posts cursor" must be a positive or negative integer.'
            })
        }
      ]
    )

const primitive = {
  postIdSchema,
  limitSchema,
  sortSchema,
  cursorSchema
}

export default primitive
