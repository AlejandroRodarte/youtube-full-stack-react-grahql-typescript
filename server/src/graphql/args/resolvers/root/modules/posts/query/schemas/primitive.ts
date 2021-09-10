import Joi from 'joi'

import constants from '../../../../../../../../constants'

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
      constants.graphql.args.posts.SortTypes.NEW,
      constants.graphql.args.posts.SortTypes.POPULAR
    )
    .label('Posts sorting type')

const cursorSchema =
  Joi
    .alternatives()
    .conditional(
      'sort',
      [
        {
          is: constants.graphql.args.posts.SortTypes.NEW,
          then: baseCursorSchema
            .regex(constants.regex.positiveIntegers)
            .messages({
              'string.pattern.base': '"Posts cursor" must be a positive integer.'
            })
        },
        {
          is: constants.graphql.args.posts.SortTypes.POPULAR,
          then: baseCursorSchema
            .regex(constants.regex.cursors.posts.popular)
            .messages({
              'string.pattern.base': '"Posts cursor" must follow this format: createdAt=<createdAt>,points=<points>.'
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
