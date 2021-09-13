import Joi from 'joi'

import constants from '../../../../../../../../constants/graphql/args/updoots'

const postIdSchema =
  Joi
    .number()
    .required()
    .min(1)
    .label('Post ID')

const valueSchema =
  Joi
    .number()
    .required()
    .valid(
      constants.VoteValueTypes.UPVOTE,
      constants.VoteValueTypes.DOWNVOTE,
      constants.VoteValueTypes.ZERO
    )
    .label('Updoot value')
    .messages({
      'any.only': '"Updoot value" must be either -1, 0, or 1.'
    })

const primitive = {
  postIdSchema,
  valueSchema
}

export default primitive
