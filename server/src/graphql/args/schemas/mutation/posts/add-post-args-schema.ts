import Joi from 'joi'

import primitive from './primitive'

interface AddPostDataSchemaInterface {
  title: Joi.StringSchema
  text: Joi.StringSchema
}

interface AddPostArgsSchemaInterface {
  data: Joi.ObjectSchema<AddPostDataSchemaInterface>
}

const AddPostDataSchema =
  Joi
    .object<AddPostDataSchemaInterface>()
    .keys({
      title:
        primitive
          .titleSchema
          .required(),
      text:
        primitive
          .textSchema
          .required()
    })

const AddPostArgsSchema =
  Joi
    .object<AddPostArgsSchemaInterface>()
    .keys({ data: AddPostDataSchema })

export default AddPostArgsSchema
