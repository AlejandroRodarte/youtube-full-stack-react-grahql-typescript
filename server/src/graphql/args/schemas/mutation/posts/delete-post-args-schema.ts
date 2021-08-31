import Joi from 'joi'

import primitive from './primitive'

interface DeletePostDataSchemaInterface {
  id: Joi.NumberSchema
}

interface DeletePostArgsSchemaInterface {
  data: Joi.ObjectSchema<DeletePostDataSchemaInterface>
}

const DeletePostDataSchema =
  Joi
    .object<DeletePostDataSchemaInterface>()
    .keys({
      id: primitive.postIdSchema
    })

const DeletePostArgsSchema =
  Joi
    .object<DeletePostArgsSchemaInterface>()
    .keys({ data: DeletePostDataSchema })

export default DeletePostArgsSchema
