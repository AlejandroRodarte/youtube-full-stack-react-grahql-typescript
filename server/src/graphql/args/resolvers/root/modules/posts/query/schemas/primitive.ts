import Joi from 'joi'

import constants from '../../../../../../../../constants'

const numberArraySchema =
  Joi
    .array()
    .optional()
    .items(Joi.number())

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
    .max(25)
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
      constants.graphql.args.posts.SortTypes.POPULAR,
      constants.graphql.args.posts.SortTypes.TRENDING
    )
    .label('Posts sorting type')

const excludeIdsSchema =
  Joi
    .alternatives()
    .conditional(
      'sort',
      [
        {
          is: constants.graphql.args.posts.SortTypes.NEW,
          then: Joi.valid(null)
        },
        {
          is: constants.graphql.args.posts.SortTypes.POPULAR,
          then: numberArraySchema.allow(null)
        },
        {
          is: constants.graphql.args.posts.SortTypes.TRENDING,
          then: numberArraySchema.allow(null)
        }
      ]
    )

const cursorSchema =
  Joi
    .alternatives()
    .conditional(
      'sort',
      [
        {
          is: constants.graphql.args.posts.SortTypes.NEW,
          then: baseCursorSchema
            .allow(null)
            .regex(constants.regex.positiveIntegers)
            .messages({
              'string.pattern.base': '"Posts cursor" must be a positive integer.'
            })
        },
        {
          is: constants.graphql.args.posts.SortTypes.POPULAR,
          then: baseCursorSchema
            .allow(null)
            .regex(constants.regex.cursors.posts.popular)
            .messages({
              'string.pattern.base': '"Posts cursor" must follow this format: createdAt=<createdAt>,points=<points>.'
            })
        },
        {
          is: constants.graphql.args.posts.SortTypes.TRENDING,
          then: baseCursorSchema
            .allow(null)
            .regex(constants.regex.cursors.posts.trending)
            .messages({
              'string.pattern.base': '"Posts cursor" must follow this format: createdAt=<createdAt>,points=<points>,trendingScore=<trendingScore>.'
            })
        }
      ]
    )

const timestampSchema =
  Joi
    .string()
    .required()
    .regex(constants.regex.positiveIntegers)
    .messages({
      'string.pattern.base': '"Timestamp" must be a positive integer.'
    })
    .label('Timestamp')

const primitive = {
  postIdSchema,
  limitSchema,
  sortSchema,
  excludeIdsSchema,
  cursorSchema,
  timestampSchema
}

export default primitive
