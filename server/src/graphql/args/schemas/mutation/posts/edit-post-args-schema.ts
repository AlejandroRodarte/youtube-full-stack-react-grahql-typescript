import Joi from 'joi'

import primitive from './primitive'

interface EditPostDataFieldsSchemaInterface {
  title: Joi.StringSchema
  text: Joi.StringSchema
}
interface EditPostDataSchemaInterface {
  id: Joi.NumberSchema
  fields: Joi.ObjectSchema<EditPostDataFieldsSchemaInterface>
}

interface EditPostArgsSchemaInterface {
  data: Joi.ObjectSchema<EditPostDataSchemaInterface>
}

const EditPostDataSchema =
  Joi
    .object<EditPostDataSchemaInterface>()
    .keys({
      id: primitive.postIdSchema,
      fields: Joi
        .object<EditPostDataFieldsSchemaInterface>()
        .keys({
          title:
            primitive
              .titleSchema
              .optional(),
          text:
            primitive
              .textSchema
              .optional()
        })
    })

const EditPostArgsSchema =
  Joi
    .object<EditPostArgsSchemaInterface>()
    .keys({ data: EditPostDataSchema })

export default EditPostArgsSchema
